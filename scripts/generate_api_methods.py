import json
import os
from openai import OpenAI

def load_api_data():
    with open("capture_tools/api_capture.json", "r") as f:
        return json.load(f)

def build_prompt(entry):
    return f"""
Convert this API call into a reusable method.

API Request:
URL: {entry['url']}
Method: {entry['method']}
Headers: {json.dumps(entry['headers'], indent=2)}
Body: {json.dumps(entry['body'], indent=2)}

Return a Playwright-style API client method (JavaScript) with:
- Schema validation (Zod)
- Error handling
- Reusable wrapper
"""

def main():
    api_key = os.getenv("LLM_API_KEY")
    if not api_key:
        raise Exception("❌ LLM_API_KEY not set in environment variables")

    client = OpenAI(api_key=api_key)

    data = load_api_data()

    output_dir = "generated"
    os.makedirs(output_dir, exist_ok=True)

    for i, entry in enumerate(data):
        prompt = build_prompt(entry)

        print(f"Processing API #{i+1}: {entry['url']}")

        response = client.chat.completions.create(
            model="gpt-4.1",
            messages=[{"role": "user", "content": prompt}]
        )

        generated_code = response.choices[0].message.content

        file_path = f"{output_dir}/api_method_{i+1}.js"
        with open(file_path, "w") as f:
            f.write(generated_code)

        print(f"✔ Generated: {file_path}")

if __name__ == "__main__":
    main()
