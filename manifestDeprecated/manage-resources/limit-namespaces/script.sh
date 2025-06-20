kubectl create ns test

kubectl --namespace test create \
    -f limit-range.yml \
    --save-config --record

kubectl describe namespace test

kubectl --namespace test create \
    -f go-demo-2-no-res.yml \
    --save-config --record

kubectl --namespace test \
    rollout status \
    deployment go-demo-2-api

kubectl --namespace test describe \
    pod go-demo-2-db