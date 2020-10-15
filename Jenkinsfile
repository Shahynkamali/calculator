pipeline {
    agent {
        label 'sre'
    }
    environment {}
    stages {
        stage('build') {
            agent {
                dockerfile {
                    filename 'Dockerfile'
                    dir '.devcontainer'
                    label 'docker'
                }
            }
            steps {
                sh 'yarn'
                sh 'yarn test:unit'
            }
        }
    }
}