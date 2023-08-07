SERVER FARM

Load balancer like application using NodeJs.
Aim is to create and manage a pool of instances of an application executable. This pool
consists of processes which runs the provided executable file and listens on stdin for an input.
When an input is provided on stdin, the nodejs application manages to send it to free available instance of an executable. The executable can read the stdin and process it to produce result and later write the result to its 
stdin. The nodejs sample app has attached a listener for each running instance of executable to read the result from spawned process's stdout.
When executable sends finished flag, the nodejs application marks the process as "free" for further stdin input requests.

Features:
-Configurable number of instances to be launched of given executable
-Application executable is configurable
-Memory monitor keeps track of running processes and kills/restarts if a process memory usage exceeds the threshold

Future Enhancements
-Upscalling/downScalling the instances based on system configuration or request load