#! /bin/bash

if [ $# -lt 4 ]
 then
	echo  
	echo ' Error. Pass complete arguments. Run the below command to execute this script'
	echo 
	echo ' ./addusers.sh -n NoofUsers -to 60'
	echo ' -n : is the no of users that you want to connect in the session'
	echo ' -to: is the timeout, for how much time you want these users to remain in session. Pass this argument in no of seconds'
	echo
	exit
fi

if [ $1 == '-h' -o $1 == '--help' ]
 then
	echo
	echo ' Run the below command to execute this script'

	echo './addusers.sh -n 10 -to 60'
	echo '-n is the no of users that you want to connect in session'
	echo '-to is the timeout, for how much time you want these users to remain in session. Pass this argument in no of seconds'
	echo
	exit
fi

if [ ! $1 == '-n' -o  ! $3 == '-to' ]
 then
	echo
	echo '  options are not correct. Use the below command to execute this script'
	echo
	echo ' ./ addusers.sh -n 20 -to 60'
	echo ' -n : is the no of users that you want to connect in the session'
	echo ' -to: is the timeout, for how much time you want these users to remain in session. Pass this argument in no of seconds'
	echo
	exit
fi

if [ $2 -ne 0 -o $2 -eq 0 2>/dev/null ]
 then
	if [ ! $2 -gt 0 ]
	 then
		echo
		echo ' User count should be integer and greater than zero. Use the below command'
		
	fi
else
	echo
	echo "Supplied Input is not an Integer."
	echo
	echo ' ./ addusers.sh -n 20 -to 60'
	echo ' -n : is the no of users that you want to connect in the session'
	echo ' -to: is the timeout, for how much time you want these users to remain in session. Pass this argument in no of seconds'
	echo

	exit
fi

if [ $4 -ne 0 -o $4 -eq 0 2>/dev/null ]
 then
	if [ ! $2 -gt 0 ]
	 then
		echo
		echo ' User count should be integer and greater than zero. Use the below command'
		echo
		echo ' ./ addusers.sh -n 20 -to 60'
		echo ' -n : is the no of users that you want to connect in the session'
		echo ' -to: is the timeout, for how much time you want these users to remain in session. Pass this argument in no of seconds'
		echo	
		exit
	fi
else
	echo
	echo "Supplied Input is not an Integer."
	echo
	echo ' ./ addusers.sh -n 20 -to 60'
	echo ' -n : is the no of users that you want to connect in the session'
	echo ' -to: is the timeout, for how much time you want these users to remain in session. Pass this argument in no of seconds'
	echo
	exit
fi



env n=$2 to=$4 ./../node_modules/mocha/bin/_mocha ./test.js
						# command to execute the test case
