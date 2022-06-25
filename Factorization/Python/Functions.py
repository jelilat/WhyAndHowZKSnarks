# Problem: Prover claims to know a polynomial (p(x)) of a particular degree, that has t(x) = (x − 1)(x − 2) as its co-factor.

from numpy.polynomial import polynomial
import numpy as np

r = 23
tx = (1, -3, 2)

# ----------------------------------------------- Verifier Functions -----------------------------------------------

# Verifier Function 1
def tOfX():
  # Find t(r)
  t = np.polyval(tx, r)
  return t

# Verifier Function 2
def verify():
  t = tOfX()
  [p, h] = prove()

  return (t == p/h)


# ----------------------------------------------- Prover Functions -----------------------------------------------

# Prover Function
def prove():
  px = (1, -3, 2, 0) 

  hx, rx = polynomial.polydiv(px, tx) 
  _hx = np.append(hx, rx)

  p = np.polyval(px, r)
  h = np.polyval(_hx, r)
  return [p, h]