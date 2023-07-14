## Morewebapp
Morewebapp is a full stack application built for classifying and grading the quality of banana, orange and apples.


## TechStack 
- Python 
- Javascript 
- TailwindCss

## Github Link
- https://github.com/t-bello7/more


## How to Setup

# Prerequisite
The following tools need to be installed on your machine to run the application
- Python - You can go [here](https://www.python.org/downloads/) to download and install 
- NodeJS - You can go [here](https://nodejs.org/en/download/current) to download and install
- Anaconda - You can go [here](https://www.anaconda.com/products/individual) to download and install
- Yarn package manager - You can go [here](https://yarnpkg.com/getting-started/install) on how to install



# Get your computers IP address by running the command below on your terminal.
On Windows
 
```
ifconfig | findstr IPv4 
```

On Linux
```
hostname -I | awk '{print $1}'
```
On Mac 

```
ipconfig | grep "inet" | grep -v 127.0.0.1 | awk '{print $2}'

```

# Start the backend server 
- From the root directoy of the folder change directory in the terminal to the backend folder 
```
cd backend
```

- Create a virtual environment with the python 3.7 version
```
conda create -n <your_env_name> python=3.7.x
```

- If you already created a virtual envrionment you can start the virtual environment with the command

```
conda activate <your_env_name>
```
- Install project dependencies
```
    pip install -r requirements.txt
```
- Replace the host address in the app.py file with your computers ip address
    ```
    app.run(debug=True, host='<your_computer_ip_address>')
    ```
- Run the command to start the server
```
python app.py
```

# Start the frontend server
- From the root directory of the folder change directory into the frontend
```
cd frontend
```
- Install project dependencies 
    ```
    yarn install
    ```
- Repalace the host address in the hooks/uploadHook.js file with your computers ip address
```
  const response = await axios.post(`http://<your_computer_ip_address>${url}`, formData, {
```
- Run the command to start the server

```
yarn dev

```
- Go to the url - http://localhost:5137