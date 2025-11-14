from mitmproxy import http
import json, time


def response(flow: http.HTTPFlow):
entry = {
"timestamp": time.time(),
"method": flow.request.method,
"url": flow.request.pretty_url,
"request_headers": dict(flow.request.headers),
"request_body": flow.request.get_text(),
"status": flow.response.status_code,
"response_headers": dict(flow.response.headers),
"response_body": flow.response.get_text()
}


with open("captures/raw/capture.json", "a") as f:
f.write(json.dumps(entry) + "\n")
