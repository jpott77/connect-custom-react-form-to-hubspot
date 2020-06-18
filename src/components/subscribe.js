import React, { useState } from "react";

const Subscribe = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (evt) => {

        evt.preventDefault();
        var xhr = new XMLHttpRequest();
        var url = 'https://api.hsforms.com/submissions/v3/integration/submit/PORTAL-ID/FORM-ID'
        var data = {
            "fields": [
                {
                    "name": "email",
                    "value": email
                },
                {
                    "name": "firstname",
                    "value": name
                }
            ],
            "context": {
                "pageUri": "www.juliapottinger.com",
                "pageName": "Julia Pottinger"
            },
        }

        var final_data = JSON.stringify(data)

        xhr.open('POST', url);
        // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert(xhr.responseText); // Returns a 200 response if the submission is successful.
            } else if (xhr.readyState === 4 && xhr.status === 403) {
                alert(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.     
            } else if (xhr.readyState === 4 && xhr.status === 404) {
                alert(xhr.responseText); //Returns a 404 error if the formGuid isn't found    
            }
        }

        // Sends the request 
        xhr.send(final_data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>
                Subscribe To Newsletter
            </h4>
            <label>
                Full Name:
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Email
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
        </form>
    )
}

export default Subscribe