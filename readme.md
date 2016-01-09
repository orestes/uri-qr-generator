# uri-qr-generator

A simple HTTP API to generate URI QR codes in SVG format

## Setup

```
git clone https://github.com/orestes/uri-qr-generator.git
cd uri-qr-generator
npm install
cp config.template.json config.json
node server.js
```

If everything's working correctly, you'll get the following message:

```
quaero-qr-generator is now listening on port 8080
```

## Configuration

Edit `config.json`:

| Parameter | Default |  Use |
|-|-|-|
| port | `80` | Where the HTTP server should listen. |
| uriPrefix | `""`|   A prefix prepended to the all the URIs |
| paramName | `uri` | The `GET` param name containing the URI to encode as a QR Code. |
w
## Usage

Make an `HTTP GET` request to `https://server:port/?uri=https:%2F%2Fsome-server/a/b`. The response is a QR Code in SVG format. This is the QR encoded representation of `https://some-server/a/b` URI.

Remember to correctly encode `GET` params.

### Embeddeding QR codes as HTML images

Since we're using GET params, we can use the request URI as an image source, which be cached by browsers, proxies, etc...

If your `port` parameter is set to `80` (the default HTTP port in browsers) in `config.json`, you can skip the port when using the images

`<img src="https://server/?uri=https:%2F%2Fsome-server/a/b" alt="https://some-server/a/b" />`

### Anti-abuse configuration

Unless you protect your API (by proxying through some other HTTP server, for example), anyone making requests to your service could be generating QR codes for free using your resources.

A typical use case is generating QR codes for a single domain name. Set your **uriPrefix** to `"https://my-domain"` and then pass relative URLs in your `GET` param values. Since every QR code will now start with your domain name there's no use for anyone else.

You should also rename the GET param to `path` so the API requests are more clear:

Example `config.json`

```
{
  "port": 8080,
  "uriPrefix": "https://my-domain",
  "paramName": "path"
}
```

Now, `http://server:port/?path=/a/b` will return a QR Code in SVG format, pointing to `https://my-domain/a/b`

## Troubleshooting

Make sure the HTTP port (*default: 8080*) is not in use by some other process and/or change the HTTP port in the configuration. In some operating systems, you cannot listen on ports under 1000 without root permissions.

Feel free to [open an issue here](https://github.com/orestes/uri-qr-generator/issues)

## License
The MIT License (MIT)

Copyright (c) 2016 Orestes Carracedo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
