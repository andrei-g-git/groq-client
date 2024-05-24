Just npm install

If the API Key from Groq is no longer valid then just head over to their webiste and generate one:

https://console.groq.com/keys

Then inside src/features/chat.jsx replace it here: 

```
    <form className="chat-form"
        onSubmit={handleSubmit(
            prompt, 
            new Groq({
                apiKey: "<your api key>", //<-------
                dangerouslyAllowBrowser: true
            }), 

            //...
```