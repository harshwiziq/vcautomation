#!/bin/bash
JQ=./bin/jq-linux64

echo $DIR

echo "   $JQ"


echo
txt=`curl -k -w "$STATUS_CODE" -H "Content-Type: application/json" -X GET https://prov-vcqa.wiziq.com/prov/v1/class/test101/config`
aa=$(echo $txt  | $JQ '.docker' |$JQ '.create_ts')
echo $aa

typ.key="value";
