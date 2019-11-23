# Gluckometer to speech
Project for Smart health hackathon



# API 

Current API is running on https://smart-health-hackathon-server.herokuapp.com

## /detect

## Request

```json
{
    "gluckometerImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQAB...",
    "language": "cs"
}
```

## Response

```json
{
    "data": {
        "glucoseValue": 15.9,
        "speech": {
            "text": "15.9 je hodnota vaší glykémie.",
            "ssml": "<!-- ?xml version=\"1.0\"? -->\n    <speak xmlns=\"http://www.w3.org/2001/10/synthesis\"\n        xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n        version=\"1.0\">\n            <p>\n                15.9 je hodnota vaší glykémie.\n            </p>\n    </speak>",
            "mp3": "data:audio/mp3;base64,//NExAAAAANIAAAAALYwEAAACFHgAABBBCDgOAgCGoEAQlAx/KOWD8H35QMZcEIPnxGfEAYWCAIeisEOXflAfeIAxxBIeXfhgTg+8EwfD/E4fX7zWfIgWs0jz/mb5hz9//NExFMRMD3gAUYYAP/8Qr9anLo8x6eta5gJ4HMAuP1KdQDoC+EuJoF8/VbQEbCfjBgSZTHO2v1/ExDjGEGDE0DmFN9fboeuZjnADgBRBgBIgthAJb//2rtUgF0DmBZl//NExGEiGyowAZhoAMTHGMOMGIwFoKAnH/9+9tlu1Pzcegb5JjzOEgMAABsFLGECpgC+HGobjMEeolaR+nm/vz/7/7+7ymjvHb65qE/XT3IiN/aGLjxhYAVFt338u8ku//NExCsbsyqUAYgwANketoOxvcILiL9ZnfSnC4UVBDDwTY7ZexsZ/btcZUINeYe1d9MdwePt..."
        }
    },
    "raw": {
        "ocrParsing": [
            {
                "ParsedResults": [
                    {
                        "TextOverlay": {
                            "Lines": [],
                            "HasOverlay": true,
                            "Message": "Total lines: 0"
                        },
                        "TextOrientation": "0",
                        "FileParseExitCode": 1,
                        "ParsedText": "High Glucose\n15,9\nmmo\n16:00\n12:00\n08:00\nFreeStyle Libre",
                        "ErrorMessage": "",
                        "ErrorDetails": ""
                    }
                ],
                "OCRExitCode": 1,
                "IsErroredOnProcessing": false,
                "ProcessingTimeInMilliseconds": "3144",
                "SearchablePDFURL": ""
            }
        ]
    }
}
```