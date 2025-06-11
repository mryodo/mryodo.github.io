---
title: "Efficient Sparsification of Simplicial Complexes via Local Densities of States"
authors: ["A&nbsp;Savostianov", "MT&nbsp;Schaub", "N&nbsp;Guglielmi", "F&nbsp;Tudisco"]
year: 2025
sort: "2025-02-01"
type: preprint
journal: arXiv
# image: racc_model.svg
# A bibtex (or any other format) citation that people can copy directly from the website.
citation: |
  @article{
  savostianov2025efficient,
  title={Efficient Sparsification of Simplicial Complexes via Local Densities of States},
  author={Savostianov, Anton and Schaub, Michael T and Guglielmi, Nicola and Tudisco, Francesco},
  journal={arXiv preprint arXiv:2502.07558},
  year={2025}
    }
pdf: https://arxiv.org/pdf/2502.07558
# A list of link that will appear as badges at the bottom of the publication.
links:
     - name: arxiv
       url: https://arxiv.org/pdf/2502.07558
     - name: poster
       url: "/slides/netsci_2025_poster.pdf"
     - name: github
       url: "https://git.rwth-aachen.de/netsci/2025-efficient-sparsification-of-simplicial-complexes-via-local-densities-of-states"
#     - name: PyPI
#       url: "https://pypi.org/project/py-raccoon/"
---

<small> Simplicial complexes (SCs), a generalization of graph models for relational data that account for higher-order relations between data items, have become a popular abstraction for analyzing complex data using tools from topological data analysis or topological signal processing. However, the analysis of many real-world datasets leads to dense SCs with a large number of higher-order interactions. Unfortunately, analyzing such large SCs often has a prohibitive cost in terms of computation time and memory consumption. The sparsification of such complexes, i.e., the approximation of an original SC with a sparser simplicial complex with only a log-linear number of high-order simplices while maintaining a spectrum close to the original SC, is of broad interest.

In this work, we develop a novel method for a probabilistic sparsification of SCs. At its core lies the efficient computation of sparsifying sampling probability through local densities of states as functional descriptors of the spectral information. To avoid pathological structures in the spectrum of the corresponding Hodge Laplacian operators, we suggest a ``kernel-ignoring'' decomposition for approximating the sampling probability; additionally, we exploit error estimates to show asymptotically prevailing algorithmic complexity of the developed method. The performance of the framework is demonstrated on the family of Vietoris-Rips filtered simplicial complexes.</small>
