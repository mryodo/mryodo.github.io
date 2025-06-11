---
title: "Convergence of gradient based training for linear Graph Neural Networks"
authors: ["D&nbsp;Patel", "A&nbsp;Savostianov", "MT&nbsp;Schaub"]
year: 2025
sort: "2025-01-31"
type: preprint
journal: arXiv
# image: racc_model.svg
# A bibtex (or any other format) citation that people can copy directly from the website.
citation: |
  @article{patel2025convergence,
    title={Convergence of gradient based training for linear Graph Neural Networks},
    author={Patel, Dhiraj and Savostianov, Anton and Schaub, Michael T},
    year={2025},
    eprint={2501.14440},
    archivePrefix={arXiv},
    primaryClass={cs.LG}
  }
pdf: https://arxiv.org/pdf/2501.14440
# A list of link that will appear as badges at the bottom of the publication.
links:
     - name: arxiv
       url: "https://arxiv.org/pdf/2501.14440"
#     - name: Github
#       url: "https://github.com/josefhoppe/random-abstract-cell-complexes"
#     - name: PyPI
#       url: "https://pypi.org/project/py-raccoon/"
---

<small>Graph Neural Networks (GNNs) are powerful tools for addressing learning problems on graph structures, with a wide range of applications in molecular biology and social networks. However, the theoretical foundations underlying their empirical performance are not well understood. In this article, we examine the convergence of gradient dynamics in the training of linear GNNs. Specifically, we prove that the gradient flow for training a linear GNN with mean squared loss converges to the global minimum at an exponential rate. The convergence rate depends explicitly on the initial weights and the graph shift operator. We validate this dependence on synthetic datasets from well-known graph models and real-world datasets. Furthermore, we discuss the gradient flow that minimizes the total weight at the global minimum. In addition to the gradient flow, we study the convergence of linear GNNs under gradient descent training, an iterative scheme viewed as a discretization of gradient flow.</small>
