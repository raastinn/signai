from fastapi import FastAPI, HTTPException
from signai import generate_branding, generate_keywords
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)
MAX_INPUT_LENGTH = 32

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

@app.get("/generate_branding")
async def generate_branding_api(prompt: str):
    validate_input_length(prompt)
    branding_output = generate_branding(prompt)
    return {"branding": branding_output, "keywords": []}

@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords_array = generate_keywords(prompt)
    return {"branding": None, "keywords": keywords_array}

@app.get("/generate_branding_and_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    branding_output = generate_branding(prompt)
    keywords_array = generate_keywords(prompt)
    return {"branding": branding_output, "keywords": keywords_array}

def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.")
    pass

# uvicorn signai_api:app --reload