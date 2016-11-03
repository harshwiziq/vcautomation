#! /bin/bash

if [ $# -lt 4 ]
 then
	echo  
	echo ' Error. Pass complete arguments. Run the below command to execute this script'
	echo 
	echo ' ./content.sh -n nameoffilewithextension -s sessioname'
	echo ' -n : is the name of file that you want to upload'
	echo ' -s : is the name of session'
	exit
fi

if [ $1 == '-h' -o $1 == '--help' ]
 then
	echo
	echo ' Run the below command to execute this script'

	echo './content.sh -n nameoffilewithextension -s sessionname'
	echo '-n : is the name of file that you want to upload'
	echo '-s : is the name of session'
	exit
fi

if [ ! $1 == '-n' -o ! $3 == '-s' ]
 then
	echo
	echo '  options are not correct. Use the below command to execute this script'
	echo
	echo ' ./ content.sh -n nameoffilewithextension -s sessionname'
	echo ' -n : is the name of file that you want to upload'
	echo ' -s : is the name of session'
	exit
fi


#env n=$2 s=$4 ./../node_modules/mocha/bin/_mocha ./test2.js
						# command to execute the test case

env n=$2 s=$4 node app1.js
