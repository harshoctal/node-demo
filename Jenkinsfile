pipeline {
agent any

```
environment {
    IMAGE = "kuber19/node-demo"
    TAG = "${BUILD_NUMBER}"
    DOCKERHUB_CREDS = "dockerhub-creds"
}

stages {

    stage('Checkout Code') {
        steps {
            git branch: 'main', url: 'https://github.com/harshoctal/node-demo.git'
        }
    }

    stage('Build Docker Image') {
        steps {
            sh "docker build -t $IMAGE:$TAG ."
            sh "docker tag $IMAGE:$TAG $IMAGE:latest"
        }
    }

    stage('Login to DockerHub') {
        steps {
            withCredentials([usernamePassword(
                credentialsId: DOCKERHUB_CREDS,
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {
                sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
            }
        }
    }

    stage('Push Image') {
        steps {
            sh "docker push $IMAGE:$TAG"
            sh "docker push $IMAGE:latest"
        }
    }

    stage('Deploy to Kubernetes') {
        steps {
            sh "kubectl set image deployment/node-app node-app=$IMAGE:$TAG"
        }
    }
}

post {
    always {
        echo "Pipeline finished."
    }
    success {
        echo "SUCCESS: Build & Deployment completed."
    }
    failure {
        echo "ERROR: Something failed. Check logs."
    }
}
```

}
