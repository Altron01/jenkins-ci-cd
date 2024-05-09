pipeline {
    agent {

        kubernetes {

            label 'my-kubernetes-agent'

        }

    }


    triggers {
        issueCommentTrigger('.*test this please.*')
    }
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
