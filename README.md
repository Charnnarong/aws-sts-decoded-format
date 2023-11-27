# aws-sts-decoded-format

After running `aws sts decode-authorization-message --encoded-message abc123`, where `abc123` is the encoded message, you will receive JSON output. However, it is not formatted. You will need to replace `\"` with `"` and `"{}"` with `{}`, and then format it. Afterward, use a JSON formatter for improved readability.

This plugin performs the text replacements mentioned above and formats a file.

## Example

From

```json
{"DecodedMessage": "{\"allowed\":false}"}
```

To  
(Run `AWS STS Decoded format` command from command palette)

```json
{
  "DecodedMessage": { "allowed": false }
}
```

## Extension hub

<https://marketplace.visualstudio.com/items?itemName=kone-cth.aws-sts-decoded-format>
