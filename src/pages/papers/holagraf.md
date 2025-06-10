---
title: "Quantifying the structural stability of simplicial homology"
authors: ["A&nbsp;Savostianov", "N&nbsp;Guglielmi", "F&nbsp;Tudisco"]
year: 2023
sort: "2023-02-01"
type: journal
journal: Journal of Scientific Computing
# image: racc_model.svg
# A bibtex (or any other format) citation that people can copy directly from the website.
citation: |
  @article{guglielmi2023quantifying,
      title={Quantifying the structural stability of simplicial homology},
      author={Guglielmi, Nicola and Savostianov, Anton and Tudisco, Francesco},
      journal={Journal of Scientific Computing},
      volume={97},
      number={1},
      pages={2},
      year={2023},
      publisher={Springer}
      }
pdf: https://arxiv.org/pdf/2502.07558
# A list of link that will appear as badges at the bottom of the publication.
links:
     - name: doi
       url: "https://link.springer.com/article/10.1007/s10915-023-02314-2"
     - name: arxiv
       url: "https://arxiv.org/abs/2301.03627"
     - name: github
       url: "https://github.com/COMPiLELab/HOLaGraF"
#     - name: PyPI
#       url: "https://pypi.org/project/py-raccoon/"
---

The homology groups of a simplicial complex reveal fundamental properties of the topology of the data or the system and the notion of topological stability naturally poses an important yet not fully investigated question. In the current work, we study the stability in terms of the smallest perturbation sufficient to change the dimensionality of the corresponding homology group. Such definition requires an appropriate weighting and normalizing procedure for the boundary operators acting on the Hodge algebra's homology groups. Using the resulting boundary operators, we then formulate the question of structural stability as a spectral matrix nearness problem for the corresponding higher-order graph Laplacian. We develop a bilevel optimization procedure suitable for the formulated matrix nearness problem and illustrate the method's performance on a variety of synthetic quasi-triangulation datasets and transportation networks.