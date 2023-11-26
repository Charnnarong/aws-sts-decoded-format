# aws-sts-decoded-format

After running `aws sts decode-authorization-message --encoded-message abc123` where `abc123` is the encoded message. You will get the json output. However it is not format. You will need to replace `\"` with `"` and replace `"{}"` to `{}` and format it. Then using JSON format against the replaced text for readability.

This plugin perform the text replacement mentioned above and call format on a file.
