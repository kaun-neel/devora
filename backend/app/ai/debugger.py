import re
from .llm_client import call_ollama

def detect_language(code: str) -> str:
    try:
        from guesslang import Guess
        guess = Guess()
        lang = guess.language_name(code)
        return lang if lang else "unknown"
    except Exception:
        return "unknown"

async def run_debugger(code: str) -> dict:
    detected_lang = detect_language(code)
    
    system_prompt = """You are an elite debugging machine. Analyze the code, find the bugs, and provide the exact fixed code.
You MUST output ONLY a valid JSON object matching this schema perfectly:
{
  "language": "python",
  "errors": [
    {"line": 2, "type": "SyntaxError", "explanation": "Missing parentheses"}
  ],
  "fixed_code": "the full corrected source code with \\n for newlines",
  "changes": [
    {"original": "EXACT literal string of the wrong line from user's code", "fixed": "EXACT replacement line or lines", "reason": "why it was wrong"}
  ],
  "summary": "overall summary"
}
CRITICAL: ALL strings MUST use double quotes ("). NEVER use backticks (`) or single quotes for strings. You MUST escape all newlines inside strings using \\n.
CRITICAL FOR CHANGES: The 'original' string in 'changes' MUST perfectly match the exact wrong text from the user's code. Do NOT use generic placeholders like 'bad code snippet'. The 'fixed' string MUST perfectly match the exact new text in 'fixed_code'.
"""
    user_prompt = f"Please debug the following code:\n\n```{detected_lang}\n{code}\n```"
    
    try:
        content = await call_ollama(system_prompt, user_prompt, response_format="json")
        
        # Remove deepseek-r1 thinking block if present
        content = re.sub(r'<think>.*?</think>', '', content, flags=re.DOTALL).strip()
        
        import json
        
        # Try raw json parsing first
        try:
            data = json.loads(content)
            return {
                "language": data.get("language", detected_lang),
                "fixed_code": data.get("fixed_code", code),
                "errors": data.get("errors", []),
                "changes": data.get("changes", []),
                "summary": data.get("summary", "Debugging complete.")
            }
        except json.JSONDecodeError:
            pass
            
        # Extract markdown json securely if raw parsing failed
        match = re.search(r'```(?:json)?\n?(.*?)\n?```', content, re.DOTALL)
        if match:
            json_str = match.group(1).strip()
            # Failsafe cleaner for trailing commas
            json_str = re.sub(r',\s*([}\]])', r'\1', json_str)
            try:
                data = json.loads(json_str)
                return {
                    "language": data.get("language", detected_lang),
                    "fixed_code": data.get("fixed_code", code),
                    "errors": data.get("errors", []),
                    "changes": data.get("changes", []),
                    "summary": data.get("summary", "Debugging complete.")
                }
            except json.JSONDecodeError:
                pass
                
        # If JSON parsing completely fails, fallback to raw format
        fixed_code = code
        summary = content
        raw_match = re.search(r'```[^\n]*\n(.*?)```', content, re.DOTALL)
        if raw_match:
            fixed_code = raw_match.group(1).strip()
            summary = content.replace(raw_match.group(0), "").strip()
        elif "```" not in content:
            fixed_code = content.strip()
            summary = "Note: Failed to parse JSON or markdown blocks."
            
        return {
            "language": detected_lang,
            "fixed_code": fixed_code,
            "errors": [{"line": 0, "type": "ParseWarning", "explanation": "The AI provided a fix but the diff failed to render. See full code."}],
            "changes": [],
            "summary": summary
        }
    except Exception as e:
        return {"error": str(e)}
