Steps to get here:

1. Init project.
    ```
    mkdir cdktf-s3-bucket
    cd cdktf-s3-bucket/
    cdktf init --local
    npm install @cdktf/provider-aws
    ```

1. Update `main.ts` w/provider & bucket.

    ```typescript
    import { Construct } from "constructs";
    import { App, TerraformStack, TerraformOutput } from "cdktf";

    import * as aws from "@cdktf/provider-aws";

    class MyStack extends TerraformStack {
    constructor(scope: Construct, name: string) {
        super(scope, name);

        new aws.AwsProvider(this, "aws", {
        region: "us-west-2",
        });

        const bucket = new aws.s3.S3Bucket(this, "bucket", {
        bucketPrefix: `learn-cdktf-${name}`,
        });

        new TerraformOutput(this, 'bucket_id', {
        value: bucket.id,
        });
    }
    }

    const app = new App();
    new MyStack(app, "cdktf-s3-bucket");
    app.synth();
    ```

1. Synth (no errors).
    ```
    cdktf synth
    ```

1. Deploy.
    ```
    cdktf deploy
    ```

Expected result: S3 bucket!

Actual result:

```
⠋ planning cdktf-s3-bucket...
[2021-12-03T11:49:00.410] [ERROR] default - ╷
│ Error: Insufficient default_retention blocks
│ 
│   on cdk.tf.json line 29, in resource.aws_s3_bucket.bucket.object_lock_configuration.rule:
│   29:           "rule": {}
│ 
│ At least 1 "default_retention" blocks are required.
╵

╷
│ Error: Insufficient default_retention blocks
│ 
│   on cdk.tf.json line 29, in resource.aws_s3_bucket.bucket.object_lock_configuration.rule:
│   29:           "rule": {}
│ 
│ At least 1 "default_retention" blocks are required.
╵
[2021-12-03T11:49:00.415] [ERROR] default - ╷
│ Error: Missing required argument
│ 
│   on cdk.tf.json line 30, in resource.aws_s3_bucket.bucket.object_lock_configuration:
│   30:         },
│ 
│ The argument "object_lock_enabled" is required, but no definition was
│ found.
╵
╷
│ Error: Insufficient apply_server_side_encryption_by_default blocks
│ 
│   on cdk.tf.json line 32, in resource.aws_s3_bucket.bucket.server_side_encryption_configuration.rule:
│   32:           "rule": {}
│ 
│ At least 1 "apply_server_side_encryption_by_default" blocks are required.
╵

╷
│ Error: Missing required argument
│ 
│   on cdk.tf.json line 30, in resource.aws_s3_bucket.bucket.object_lock_configuration:
│   30:         },
│ 
│ The argument "object_lock_enabled" is required, but no definition was
│ found.
╵
╷
│ Error: Insufficient apply_server_side_encryption_by_default blocks
│ 
│   on cdk.tf.json line 32, in resource.aws_s3_bucket.bucket.server_side_encryption_configuration.rule:
│   32:           "rule": {}
│ 
│ At least 1 "apply_server_side_encryption_by_default" blocks are required.
╵
non-zero exit code 1
```