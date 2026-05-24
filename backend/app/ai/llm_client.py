import httpx
import logging
import os

async def call_ollama(system_prompt: str, user_message: str, response_format: str = "text") -> str:
    """
    Makes an async POST request to local Ollama API chat completions.
    """
    url = "http://127.0.0.1:11434/api/chat"
    
    # Use environment variable or default to minimax-m2.5:cloud
    model_name = os.getenv("OLLAMA_MODEL", "qwen2.5-coder:3b")
    
    payload = {
        "model": model_name,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        "stream": False,
        "options": {
            "temperature": 0.2,
            "num_predict": 2048
        }
    }
    
    if response_format == "json":
        payload["format"] = "json"

    timeout = httpx.Timeout(120.0)

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(url, json=payload)
            
            if response.status_code != 200:
                raise Exception(f"Ollama API Error: {response.status_code} - {response.text}")
            
            data = response.json()
            return data["message"]["content"]
                
    except httpx.ConnectError:
        logging.warning("Ollama is not running. Returning mock response.")
        
        if "debug" in user_message.lower():
            return "```python\ndef mock_fixed_code():\n    print('fixed')\n```\n\nMOCK: Added missing print formatting."
        else:
            return "```python\ndef is_prime(n):\n    if n <= 1: return False\n    return True\n```\n\nMOCK: We simply check if the value is less than 1."
            
    except httpx.TimeoutException:
        raise Exception("Request to Ollama API timed out. Try loading a smaller model or giving it more time.")
