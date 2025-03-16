openssl genrsa -out ./rsa-keys/private.pem 2048
openssl rsa -in ./rsa-keys/private.pem -pubout -out ./rsa-keys/public.pem