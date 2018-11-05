#!/bin/bash
set -u
set -e

# wait
NEXT_WAIT_TIME=0
until nc -z localhost 8080 || [ $NEXT_WAIT_TIME -eq 10 ]
do
    echo "Waiting for Atlas server..."
    sleep $(( NEXT_WAIT_TIME++ ))
done

npm run test-e2e-aria
