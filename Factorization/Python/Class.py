from numpy.polynomial import polynomial
import numpy as np

class Verifier:
    'Problem: Prover claims to know a polynomial (p(x)) of a particular degree, that has t(x) = (x − 1)(x − 2) as its co-factor. This class will check if it is true'
    tx = (1, -3, 2)

	# initialization or constructor method of
    def __init__(self):
		
		# class Verifier
        self.r = input('enter the value of r:')
        self.t = Verifier.tOfX(self)
		
	# Verifier Function 1
    def tOfX(self):
	    # Find t(r)
        t = np.polyval(Verifier.tx, int(self.r))
        return t

	# Verifier Function 2
    def verify(self):
        [p, h] = Prover.prove(self.r)
        print(self.t == p/h)
        return (self.t == p/h)
        
class Prover:
    # Prover Function
    def prove(r):
        px = (1, -3, 2, 0) 
    
        hx, rx = polynomial.polydiv(px, Verifier.tx) 
        _hx = np.append(hx, rx)
    
        p = np.polyval(px, int(r))
        h = np.polyval(_hx, int(r))
        return [p, h]


verifier = Verifier()
verifier.verify()

