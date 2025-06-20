#!/bin/bash
mkdir -p /usercode/certs

k3d cluster create mycluster --volume "/usercode/certs:/var/lib/rancher/k3s/server/tls"

cd /usercode/certs

mkdir -p /usercode/certs/keys

openssl genrsa \
    -out /usercode/certs/keys/jdoe.key 2048

openssl req -new \
    -key /usercode/certs/keys/jdoe.key \
    -out /usercode/certs/keys/jdoe.csr \
    -subj "/CN=jdoe/O=devs"

openssl x509 -req \
    -in /usercode/certs/keys/jdoe.csr \
    -CA //usercode/certs/client-ca.crt \
    -CAkey /usercode/certs/client-ca.key \
    -CAcreateserial \
    -out /usercode/certs/keys/jdoe.crt \
    -days 365

cp /usercode/certs/server-ca.crt /usercode/certs/keys/server-ca.crt

SERVER=$(kubectl config view -o jsonpath='{.clusters[?(@.name=="k3d-mycluster")].cluster.server}')


kubectl config set-cluster jdoe \
    --certificate-authority \
    /usercode/certs/keys/server-ca.crt \
    --server $SERVER

kubectl config set-credentials jdoe \
    --client-certificate keys/jdoe.crt \
    --client-key keys/jdoe.key