resource "aws_s3_bucket" "app" {
  bucket = "app.cloud-web-app"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
