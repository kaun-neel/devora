const API_BASE = 'http://localhost:8000/api/v1';

export async function generateCode(prompt, language = 'auto') {
  try {
    const response = await fetch(`${API_BASE}/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, language })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server error: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Backend server is not running. Please start the FastAPI server.');
    }
    throw err;
  }
}

export async function debugCode(code) {
  try {
    const response = await fetch(`${API_BASE}/debug`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server error: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Backend server is not running. Please start the FastAPI server.');
    }
    throw err;
  }
}

export async function executeCode(code, language) {
  try {
    const response = await fetch(`${API_BASE}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, language })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server error: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Backend server is not running. Please start the FastAPI server.');
    }
    throw err;
  }
}
