import os
import openai
import argparse
import re

MAX_INPUT_LENGTH = 32

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    if validate_length(user_input):
        generate_branding(user_input)
        generate_keywords(user_input)
    else:
        raise ValueError(f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}")

def generate_branding(prompt: str):
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    # Prompt that gets entered as question for OpenAI
    gpt_prompt = f"Generate upbeat branding snippet for {prompt} in 30 words or less: "
    print(gpt_prompt)

    # Retrieving response
    response = openai.Completion.create(
        engine="davinci-instruct-beta-v3", prompt=gpt_prompt, max_tokens=32
    )

    # Retreiving answer from OpenAI 
    branding_output = response["choices"][0]["text"]

    # Strip whitespace
    branding_output = branding_output.strip()

    # Checks if the last character is the end of a sentence since we only allow for 32 tokens (words)
    if branding_output[-1] not in {".", "!", "?"}: 
        branding_output += "..."
    
    print(f"Result: {branding_output}")
    return branding_output

def generate_keywords(prompt: str) -> list[str]:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    # Prompt that gets entered as question for OpenAI
    gpt_prompt = f"Generate related branding keywords for {prompt}: "
    print(gpt_prompt)

    # Retrieving response
    response = openai.Completion.create(
        engine="davinci-instruct-beta-v3", prompt=gpt_prompt, max_tokens=32
    )

    # Retreiving answer from OpenAI 
    keywords_output = response["choices"][0]["text"]

    # Strip whitespace
    keywords_output = keywords_output.strip()

    # Output the results into an array, seperated by a deliminitor (, \n, ;, -) then strip any empty elements or elemenets with whitespace
    keywords_array = re.split(",|\n|;|-", keywords_output)
    keywords_array = [k.lower().strip() for k in keywords_array] # Ensures all results are lowercase (more consistent)
    keywords_array = [k for k in keywords_array if len(k) > 0]
    
    print(f"Result: {keywords_array}")
    return keywords_array

def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


if __name__ == "__main__":
    main()