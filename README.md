# launchpad
### Scenario 1: The Secure Receiver Application (Cloud Run)

 Build & Containerize:

Develop a simple API application (e.g., Flask/Python, Express/Node.js) that acts as a receiver, capable of accepting POST requests and logging the received data.
Write a Dockerfile to containerize the application.
Manually build the Docker image using Cloud Build (gcloud builds submit --tag ...) and push it to Artifact Registry.
Deploy the image to Cloud Run.

**TASK :** Private Access from a Different VPC:

Create two separate VPC networks: vpc-a and vpc-b.
Configure the Cloud Run service with Ingress settings to "Internal". Deploy/associate this service with vpc-a (e.g., by means of a Serverless VPC Access connector in vpc-a if needed, although for ingress control, the association is more about network origin).
Deploy a Compute Engine VM within vpc-b.
Networking Task: Set up VPC Network Peering between vpc-a and vpc-b. Ensure routes are exchanged.
IAM Task: Ensure the VM's service account has the run.invoker role on the Cloud Run service.
From the VM in vpc-b, use curl or a script to send requests to the Cloud Run service's invocation endpoint. This demonstrates secure, private cross-VPC access.


### Scenario 2: Serverless API Gateway

Folder structure : 

<img width="140" height="134" alt="image" src="https://github.com/user-attachments/assets/ac0daad9-8213-4dcb-bcc7-984f7025ec88" />


Phase A: Deploy the Backend Functions
* Note down the exact URLs outputted by both deployments. You will need them for the API Gateway configuration.

Phase B: Set up IAM Permissions
* API Gateway needs a dedicated Service Account to securely invoke the backend functions.

Phase C: Configure and Deploy API Gateway

Phase D: Enforce and Test API Keys
* Because the openapi.yaml requires an API key, hitting the Gateway URL directly will fail with a 401 Unauthorized error. You might have to create a key to proceed.
* Go to the Google Cloud Console: APIs & Services > Credentials.
* Click + CREATE CREDENTIALS and select API Key.
* Copy the generated API Key.
* Test the Python routing by appending the path and the key to your Gateway URL. example : curl -s "https://YOUR_GATEWAY_URL/python?key=YOUR_API_KEY"

**TASK :** Configure API Gateway permissions and ensure the API Gateway service account has the functions.invoke and/or run.invoke permissions on the backend functions, while restricting direct user invocation of the functions.

### Scenario 3 : Multi-Service Traffic Simulation


Folder Structure : 

<img width="272" height="223" alt="image" src="https://github.com/user-attachments/assets/1ad78052-380a-466f-8a36-98f341c2c010" />


* Deploy App Engine Flex (Receiver)
* Create Serverless VPC Access Connector
* Deploy Cloud Run (Traffic Simulator)
* Flow Cloud Run > Serverless VPC > App Engine Flex

**TASK :** 
Deploy both applications and configure the Serverless VPC Access connector.
Set up IAM roles for secure service-to-service communication.
Use the Cloud Run UI to start and stop traffic simulations.
Monitor application performance and resource utilization in Cloud Monitoring.
Analyze request latency and flow in Cloud Trace to understand the path and time spent in each segment.


