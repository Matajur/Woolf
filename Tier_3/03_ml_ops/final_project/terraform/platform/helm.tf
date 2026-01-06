resource "kubernetes_namespace" "argocd" {
  metadata { name = "argocd" }
}

resource "kubernetes_namespace" "monitoring" {
  metadata { name = "monitoring" }
}

resource "kubernetes_namespace" "logging" {
  metadata { name = "logging" }
}

# ArgoCD
resource "helm_release" "argocd" {
  name       = "argocd"
  namespace  = kubernetes_namespace.argocd.metadata[0].name
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "6.7.18"

  values = [file("${path.module}/values/argocd-values.yaml")]
}

# Prometheus + Grafana (kube-prometheus-stack)
resource "helm_release" "kps" {
  name       = "kube-prometheus-stack"
  namespace  = kubernetes_namespace.monitoring.metadata[0].name
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  version    = "65.5.0" # pin

  values = [file("${path.module}/values/kube-prometheus-stack-values.yaml")]
}

# Loki + Promtail
resource "helm_release" "loki_stack" {
  name       = "loki-stack"
  namespace  = kubernetes_namespace.logging.metadata[0].name
  repository = "https://grafana.github.io/helm-charts"
  chart      = "loki-stack"
  version    = "2.10.2" # pin

  values = [file("${path.module}/values/loki-stack-values.yaml")]
}
