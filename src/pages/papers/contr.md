---
title: "Contractivity of neural ODEs: An eigenvalue optimization problem"
authors: ["N&nbsp;Guglielmi", "A&nbsp;de&nbsp;Marinis", "F&nbsp;Tudisco", "A&nbsp;Savostianov" ]
year: 2025
type: journal
sort: "2025-01-14"
journal: Mathematics of Computation
# image: racc_model.svg
# A bibtex (or any other format) citation that people can copy directly from the website.
citation: |
  @article{guglielmi2025contractivity,
      title={Contractivity of neural ODEs: An eigenvalue optimization problem},
      author={Guglielmi, Nicola and De Marinis, Arturo and Savostianov, Anton and Tudisco, Francesco},
      journal={Mathematics of Computation},
      year={2025}
      }
doi: https://doi.org/10.1137/23M1626396
pdf: https://arxiv.org/abs/2401.15492
# A list of link that will appear as badges at the bottom of the publication.
#     - name: Poster
#       url: "https://hoppe.io/racc-poster.pdf"
#     - name: PyPI
#       url: "https://pypi.org/project/py-raccoon/"
links:
      - name: doi
        url: "https://doi.org/10.1090/mcom/4059" 
      - name: arxiv
        url: "https://arxiv.org/pdf/2402.13092"
     
---

We propose a novel methodology to solve a key eigenvalue optimization problem which arises in the contractivity analysis of neural ordinary differential equations (ODEs). When looking at contractivity properties of a one-layer weight-tied neural ODE 
 (with ,  is a given  matrix,  denotes an activation function and for a vector ,  has to be interpreted entry-wise), we are led to study the logarithmic norm of a set of products of type , where  is a diagonal matrix such that . Specifically, given a real number  (usually ), the problem consists in finding the largest positive interval  such that the logarithmic norm  for all diagonal matrices  with . We propose a two-level nested methodology: an inner level where, for a given , we compute an optimizer  by a gradient system approach, and an outer level where we tune  so that the value  is reached by . We extend the proposed two-level approach to the general multilayer, and possibly time-dependent, case
 and we propose several numerical examples to illustrate its behaviour, including its stabilizing performance on a one-layer neural ODE applied to the classification of the MNIST handwritten digits dataset.