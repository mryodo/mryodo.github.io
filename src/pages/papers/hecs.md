---
title: "Cholesky-like Preconditioner for Hodge Laplacians via Heavy Collapsible Subcomplex"
authors: ["A&nbsp;Savostianov", "F&nbsp;Tudisco", "N&nbsp;Guglielmi"]
year: 2024
type: journal
sort: "2024-08-15"
journal: SIAM Journal on Matrix Analysis and Applications
# image: racc_model.svg
# A bibtex (or any other format) citation that people can copy directly from the website.
citation: |
  @article{savostianov2024cholesky,
    title={Cholesky-like Preconditioner for Hodge Laplacians via Heavy Collapsible Subcomplex},
    author={Savostianov, Anton and Tudisco, Francesco and Guglielmi, Nicola},
    journal={SIAM Journal on Matrix Analysis and Applications},
    volume={45},
    number={4},
    pages={1827--1849},
    year={2024},
    publisher={SIAM}
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
        url: "https://doi.org/10.1137/23M1626396" 
      - name: arxiv
        url: "https://arxiv.org/abs/2401.15492"
      - name: github
        url: "https://github.com/COMPiLELab/HeCS"

---

Techniques based on k-th order Hodge Laplacian operators L_k are widely used to describe the topology as well as the governing dynamics of high-order systems modeled as simplicial complexes. In all of them, it is required to solve a number of least-squares problems with L_k as coefficient matrix, for example, in order to compute some portions of the spectrum or integrate the dynamical system, thus making a fast and efficient solver for the least-squares problems highly desirable. To this aim, we introduce the notion of an optimal weakly collapsible subcomplex used to construct an effective sparse Cholesky-like preconditioner for L_k that exploits the topological structure of the simplicial complex. The performance of the preconditioner is tested for the conjugate gradient method for least-squares problems (CGLS) on a variety of simplicial complexes with different dimensions and edge densities. We show that, for sparse simplicial complexes, the new preconditioner significantly reduces the condition number of L_k and performs better than the standard incomplete Cholesky factorization.

