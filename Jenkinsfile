pipeline {
  agent any

  environment {
    PROJECT = 'i_bhoomi'
    DOCKER_IMAGE = "i_bhoomi_web"
    SBOM_DIR = "docs/sbom"
    BRANCH = "${env.GIT_BRANCH ?: 'main'}"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: "${BRANCH}", url: 'https://your-repo-url.git'
      }
    }

    stage('Install Dependencies') {
      parallel {
        stage('Frontend') {
          dir('frontend') {
            steps {
              sh 'npm ci'
            }
          }
        }
        stage('Backend') {
          dir('user-service') {
            steps {
              sh 'pip install -r requirements.txt'
            }
          }
        }
      }
    }

    stage('Quality & Security Gates') {
      parallel {
        stage('Secrets Scan') {
          steps {
            sh 'trufflehog filesystem . --no-update'
          }
        }

        stage('Lint JS') {
          dir('frontend') {
            steps {
              sh 'npm run lint || true'
            }
          }
        }

        stage('SCA Audit (JS)') {
          dir('frontend') {
            steps {
              sh 'npm audit || true'
            }
          }
        }

        stage('SAST (Python)') {
          dir('user-service') {
            steps {
              sh 'bandit -r . || true'
            }
          }
        }


      }
    }

    stage('Generate SBOM') {
      parallel {
        stage('Frontend SBOM') {
          dir('frontend') {
            steps {
              sh 'npx @cyclonedx/bom -o ../../${SBOM_DIR}/frontend-sbom.json'
            }
          }
        }

        stage('Backend SBOM') {
          dir('user-service') {
            steps {
              sh 'cyclonedx-py -o ../../${SBOM_DIR}/backend-sbom.json'
            }
          }
        }
      }
    }


    stage('Build Docker Image') {
      steps {
        sh 'docker build -t ${DOCKER_IMAGE}:latest .'
      }
    }

    stage('Deploy to NGINX') {
      steps {
        sh '''
          docker stop nginx || true
          docker rm nginx || true
          docker run -d --name nginx -p 80:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro ${DOCKER_IMAGE}:latest
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: '${SBOM_DIR}/*.json', fingerprint: true
    }
    failure {
      mail to: 'devsecops@ibhoomi.dev',
           subject: "🔴 Jenkins Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
           body: "Check console output at ${env.BUILD_URL}"
    }
  }
}
