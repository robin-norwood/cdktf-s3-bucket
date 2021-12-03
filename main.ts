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
