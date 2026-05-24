import re
from .validator import is_code_related
from .llm_client import call_ollama

async def run_inquiry(user_prompt: str, language: str = "auto") -> dict:
    if not is_code_related(user_prompt):
        return {"error": "Prompt does not appear to be related to programming or code generation."}

    system_prompt = "You are a raw, intelligent algorithms assistant. You focus on mathematical and algorithmic logic. Provide ONLY the precise, robust code wrapped securely in a single markdown code block (```). Do NOT include example usage or test cases UNLESS the user explicitly asks for them in their prompt. After the code block, you MUST provide a brief explanation of how your code works."
    
    final_prompt = user_prompt
    if language != "auto":
        final_prompt += f"\n\nPlease write this code securely in {language}."
        
    try:
        content = await call_ollama(system_prompt, final_prompt)
        
        # Remove deepseek-r1 thinking block if present
        content = re.sub(r'<think>.*?</think>', '', content, flags=re.DOTALL)
        
        # Parse markdown securely
        code = ""
        explanation = content
        
        # Look for the markdown codeblock
        match = re.search(r'```[^\n]*\n(.*?)```', content, re.DOTALL)
        if match:
            code = match.group(1).strip()
            # Remove the code block from the explanation
            explanation = content.replace(match.group(0), "").strip()
        else:
            code = content.strip()
            explanation = "Note: LLM did not use markdown formatting."
            
        if not code:
            code = "# No code generated."
            
        # Structure it securely for the frontend
        return {
            "language": language if language != "auto" else "Detected",
            "code": code,
            "explanation": [e.strip() for e in explanation.split('\n') if e.strip()][:5],
            "complexity": ""
        }
    except Exception as e:
        return {"error": str(e)}
