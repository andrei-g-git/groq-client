import { useState } from "react";
import {Groq} from "groq-sdk";

function Chat() {
    const [prompt, setPrompt] = useState("");
    const [generated, setGenerated] = useState("");

    return (
        <>
            <form className="chat-form"
                onSubmit={handleSubmit(
                    prompt, 
                    new Groq({
                        apiKey: "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",
                        dangerouslyAllowBrowser: true
                    }), 
                    setGenerated,
                    requestInference
                )}
            >
                <textarea className="chat-text-area"
                    onChange={handleChange(setPrompt)}
                >

                </textarea>

                <button className="submit-button"
                    type="submit"
                >
                    Send!
                </button>
            </form>

            <div className="generated-reply-area"
                style={{border: "solid 1px black"}}
            >
                {generated}
            </div>
        
        </>
    )
}

const handleSubmit = (prompt, api, setGenerated, requestInference) => 
    (event) => {
        event.preventDefault();

        requestInference(api, prompt)
            .then(reply => {
                setGenerated(reply);
            })
    }

const handleChange = (setPrompt) => 
    (event) => {
        setPrompt(event.target.value);
    }

async function requestInference (api, prompt){
    const chatCompletion = await api.chat.completions.create({
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "model": "llama3-8b-8192",  // Aici poti sa iti alegi un model mai inteligent, de exemplu llama3-70b
        "temperature": 1,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
      });
    
    let chunks = [];
    for await (const chunk of chatCompletion){
        chunks.push(chunk.choices[0]?.delta?.content || '');
    }

    const reply = chunks.join(" ");

    return reply;
}

export default Chat
