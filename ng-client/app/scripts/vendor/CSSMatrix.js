(function () {

"use strict";

// a CSSMatrix shim
// http://www.w3.org/TR/css3-3d-transforms/#cssmatrix-interface
// http://www.w3.org/TR/css3-2d-transforms/#cssmatrix-interface


// decimal values in WebKitCSSMatrix.prototype.toString are truncated to 6 digits
var SMALL_NUMBER = 1e-6;

/**
 * CSSMatrix Shim
 * @constructor
 */
function CSSMatrix() {
	var a = [].slice.call(arguments),
		m = this;
	if (a.length) for (var i = a.length; i--;) {
		if (Math.abs(a[i]) < SMALL_NUMBER) a[i] = 0;
	}
	setIdentity(m);
	if (a.length == 16) {
		m.m11 = m.a = a[0];  m.m12 = m.b = a[1];  m.m13 = a[2];  m.m14 = a[3];
		m.m21 = m.c = a[4];  m.m22 = m.d = a[5];  m.m23 = a[6];  m.m24 = a[7];
		m.m31 = a[8];  m.m32 = a[9];  m.m33 = a[10]; m.m34 = a[11];
		m.m41 = m.e = a[12]; m.m42 = m.f = a[13]; m.m43 = a[14]; m.m44 = a[15];
	} else if (a.length == 6) {
		m.m11 = m.a = a[0]; m.m12 = m.b = a[1];
		m.m21 = m.c = a[2]; m.m22 = m.d = a[3];
		m.m41 = m.e = a[4]; m.m42 = m.f = a[5];
	} else if (typeof a[0] == 'string') {
		m.setMatrixValue(a[0]);
	} else if (a.length > 0) {
		throw new TypeError('Invalid Matrix Value');
	}
}

// Transformations

// http://en.wikipedia.org/wiki/Rotation_matrix
function rotate(rx, ry, rz) {
	rx *= Math.PI / 180;
	ry *= Math.PI / 180;
	rz *= Math.PI / 180;
	// minus sin() because of right-handed system
	var cosx = Math.cos(rx), sinx = - Math.sin(rx);
	var cosy = Math.cos(ry), siny = - Math.sin(ry);
	var cosz = Math.cos(rz), sinz = - Math.sin(rz);
	var m = new CSSMatrix();

	m.m11 = m.a = cosy * cosz;
	m.m12 = m.b = - cosy * sinz;
	m.m13 = siny;

	m.m21 = m.c = sinx * siny * cosz + cosx * sinz;
	m.m22 = m.d = cosx * cosz - sinx * siny * sinz;
	m.m23 = - sinx * cosy;

	m.m31 = sinx * sinz - cosx * siny * cosz;
	m.m32 = sinx * cosz + cosx * siny * sinz;
	m.m33 = cosx * cosy;

	return m;
}


function rotateAxisAngle(x, y, z, angle) {
	angle *= Math.PI / 360;

	var sinA = Math.sin(angle), cosA = Math.cos(angle), sinA2 = sinA * sinA;
	var length = Math.sqrt(x * x + y * y + z * z);

	if (length === 0) {
		// bad vector length, use something reasonable
		x = 0;
		y = 0;
		z = 1;
	} else {
		x /= length;
		y /= length;
		z /= length;
	}

	var x2 = x * x, y2 = y * y, z2 = z * z;

	var m = new CSSMatrix();
	m.m11 = m.a = 1 - 2 * (y2 + z2) * sinA2;
	m.m12 = m.b = 2 * (x * y * sinA2 + z * sinA * cosA);
	m.m13 = 2 * (x * z * sinA2 - y * sinA * cosA);
	m.m21 = m.c = 2 * (y * x * sinA2 - z * sinA * cosA);
	m.m22 = m.d = 1 - 2 * (z2 + x2) * sinA2;
	m.m23 = 2 * (y * z * sinA2 + x * sinA * cosA);
	m.m31 = 2 * (z * x * sinA2 + y * sinA * cosA);
	m.m32 = 2 * (z * y * sinA2 - x * sinA * cosA);
	m.m33 = 1 - 2 * (x2 + y2) * sinA2;
	m.m14 = m.m24 = m.m34 = 0;
	m.m41 = m.e = m.m42 = m.f = m.m43 = 0;
	m.m44 = 1;

	return m;
}


function scale(x, y, z) {
	var m = new CSSMatrix();
	m.m11 = m.a = x;
	m.m22 = m.d = y;
	m.m33 = z;
	return m;
}


function skewX(angle) {
	angle *= Math.PI / 180;
	var m = new CSSMatrix();
	m.m21 = m.c = Math.tan(angle);
	return m;
}


function skewY(angle) {
	angle *= Math.PI / 180;
	var m = new CSSMatrix();
	m.m12 = m.b = Math.tan(angle);
	return m;
}


function translate(x, y, z) {
	var m = new CSSMatrix();
	m.m41 = m.e = x;
	m.m42 = m.f = y;
	m.m43 = z;
	return m;
}


function inverse(m) {
	throw new Error('the inverse() method is not implemented (yet).');
}


function multiply(m1, m2) {

	var m11 = m2.m11 * m1.m11 + m2.m12 * m1.m21 + m2.m13 * m1.m31 + m2.m14 * m1.m41,
		m12 = m2.m11 * m1.m12 + m2.m12 * m1.m22 + m2.m13 * m1.m32 + m2.m14 * m1.m42,
		m13 = m2.m11 * m1.m13 + m2.m12 * m1.m23 + m2.m13 * m1.m33 + m2.m14 * m1.m43,
		m14 = m2.m11 * m1.m14 + m2.m12 * m1.m24 + m2.m13 * m1.m34 + m2.m14 * m1.m44,

		m21 = m2.m21 * m1.m11 + m2.m22 * m1.m21 + m2.m23 * m1.m31 + m2.m24 * m1.m41,
		m22 = m2.m21 * m1.m12 + m2.m22 * m1.m22 + m2.m23 * m1.m32 + m2.m24 * m1.m42,
		m23 = m2.m21 * m1.m13 + m2.m22 * m1.m23 + m2.m23 * m1.m33 + m2.m24 * m1.m43,
		m24 = m2.m21 * m1.m14 + m2.m22 * m1.m24 + m2.m23 * m1.m34 + m2.m24 * m1.m44,

		m31 = m2.m31 * m1.m11 + m2.m32 * m1.m21 + m2.m33 * m1.m31 + m2.m34 * m1.m41,
		m32 = m2.m31 * m1.m12 + m2.m32 * m1.m22 + m2.m33 * m1.m32 + m2.m34 * m1.m42,
		m33 = m2.m31 * m1.m13 + m2.m32 * m1.m23 + m2.m33 * m1.m33 + m2.m34 * m1.m43,
		m34 = m2.m31 * m1.m14 + m2.m32 * m1.m24 + m2.m33 * m1.m34 + m2.m34 * m1.m44,

		m41 = m2.m41 * m1.m11 + m2.m42 * m1.m21 + m2.m43 * m1.m31 + m2.m44 * m1.m41,
		m42 = m2.m41 * m1.m12 + m2.m42 * m1.m22 + m2.m43 * m1.m32 + m2.m44 * m1.m42,
		m43 = m2.m41 * m1.m13 + m2.m42 * m1.m23 + m2.m43 * m1.m33 + m2.m44 * m1.m43,
		m44 = m2.m41 * m1.m14 + m2.m42 * m1.m24 + m2.m43 * m1.m34 + m2.m44 * m1.m44;

	return new CSSMatrix(
		m11, m12, m13, m14,
		m21, m22, m23, m24,
		m31, m32, m33, m34,
		m41, m42, m43, m44
	);
}

// Helpers

/**
 * Set the specified matrix to the identity form
 *
 * @return {CSSMatrix} the matrix
 */
function setIdentity(m) {
	m.m11 = m.a = 1; m.m12 = m.b = 0; m.m13 = 0; m.m14 = 0;
	m.m21 = m.c = 0; m.m22 = m.d = 1; m.m23 = 0; m.m24 = 0;
	m.m31 = 0; m.m32 = 0; m.m33 = 1; m.m34 = 0;
	m.m41 = m.e = 0; m.m42 = m.f = 0; m.m43 = 0; m.m44 = 1;
	return m;
}

/**
 * Returns true of the given matrix is affine
 *
 * @return {boolean} affine
 */
function isAffine(m) {
	if (!(m.m13 || m.m14 ||
		m.m23 || m.m24 ||
		m.m31 || m.m32 || m.m33 !== 1 || m.m34 ||
		m.m43 || m.m44 !== 1)) return true;
	return false;
}


// w3c defined methods

/**
 * The setMatrixValue method replaces the existing matrix with one computed
 * from parsing the passed string as though it had been assigned to the
 * transform property in a CSS style rule.
 * @param {String} string The string to parse.
 */
CSSMatrix.prototype.setMatrixValue = function(string) {
	var i, m = this,
		parts = [],
		patternNone = /^none$/,
		patternMatrix = /^matrix\((.*)\)/,
		patternMatrix3d = /^matrix3d\((.*)\)/;

	string = String(string).trim();
	setIdentity(m);

	if (patternNone.test(string)) return m;

	parts = string.replace(/^.*\((.*)\)$/g, "$1").split(/\s*,\s*/);
	for (i = parts.length; i--;) parts[i] = parseFloat(parts[i]);

	if (patternMatrix.test(string) && parts.length === 6) {
		m.m11 = m.a = parts[0]; m.m12 = m.b = parts[2]; m.m41 = m.e = parts[4];
		m.m21 = m.c = parts[1]; m.m22 = m.d = parts[3]; m.m42 = m.f = parts[5];
	} else if (patternMatrix3d.test(string) && parts.length === 16) {
		m.m11 = m.a = parts[0]; m.m12 = m.b = parts[1]; m.m13 = parts[2];  m.m14 = parts[3];
		m.m21 = m.c = parts[4]; m.m22 = m.d = parts[5]; m.m23 = parts[6];  m.m24 = parts[7];
		m.m31 = parts[8]; m.m32 = parts[9]; m.m33 = parts[10]; m.m34 = parts[11];
		m.m41 = m.e = parts[12]; m.m42 = m.f = parts[13]; m.m43 = parts[14]; m.m44 = parts[15];
	} else {
		throw new TypeError('Invalid Matrix Value');
	}
	return m;
};


/**
 * The multiply method returns a new CSSMatrix which is the result of this
 * matrix multiplied by the passed matrix, with the passed matrix to the right.
 * This matrix is not modified.
 *
 * @param {CSSMatrix} m2
 * @return {CSSMatrix} The result matrix.
 */
CSSMatrix.prototype.multiply = function(m2) {
	return multiply(this, m2);
};


/**
 * The inverse method returns a new matrix which is the inverse of this matrix.
 * This matrix is not modified.
 *
 * method not implemented yet
 */
CSSMatrix.prototype.inverse = function() {
	return inverse(this);
};


/**
 * The translate method returns a new matrix which is this matrix post
 * multiplied by a translation matrix containing the passed values. If the z
 * component is undefined, a 0 value is used in its place. This matrix is not
 * modified.
 *
 * @param {number} x X component of the translation value.
 * @param {number} y Y component of the translation value.
 * @param {number=} z Z component of the translation value.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.translate = function(x, y, z) {
	if (typeof z == 'undefined') z = 0;
	return multiply(this, translate(x, y, z));
};


/**
 * The scale method returns a new matrix which is this matrix post multiplied by
 * a scale matrix containing the passed values. If the z component is undefined,
 * a 1 value is used in its place. If the y component is undefined, the x
 * component value is used in its place. This matrix is not modified.
 *
 * @param {number} x The X component of the scale value.
 * @param {number=} y The Y component of the scale value.
 * @param {number=} z The Z component of the scale value.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.scale = function(x, y, z) {
	if (typeof y == 'undefined') y = x;
	if (typeof z == 'undefined') z = 1;
	return multiply(this, scale(x, y, z));
};


/**
 * The rotate method returns a new matrix which is this matrix post multiplied
 * by each of 3 rotation matrices about the major axes, first X, then Y, then Z.
 * If the y and z components are undefined, the x value is used to rotate the
 * object about the z axis, as though the vector (0,0,x) were passed. All
 * rotation values are in degrees. This matrix is not modified.
 *
 * @param {number} rx The X component of the rotation value, or the Z component if the rotY and rotZ parameters are undefined.
 * @param {number=} ry The (optional) Y component of the rotation value.
 * @param {number=} rz The (optional) Z component of the rotation value.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.rotate = function(rx, ry, rz) {
	if (typeof ry == 'undefined') ry = rx;
	if (typeof rz == 'undefined') rz = rx;
	return multiply(this, rotate(rx, ry, rz));
};


/**
 * The rotateAxisAngle method returns a new matrix which is this matrix post
 * multiplied by a rotation matrix with the given axis and angle. The right-hand
 * rule is used to determine the direction of rotation. All rotation values are
 * in degrees. This matrix is not modified.
 *
 * @param {number} x The X component of the axis vector.
 * @param {number=} y The Y component of the axis vector.
 * @param {number=} z The Z component of the axis vector.
 * @param {number} angle The angle of rotation about the axis vector, in degrees.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.rotateAxisAngle = function(x, y, z, angle) {
	if (typeof y == 'undefined') y = x;
	if (typeof z == 'undefined') z = x;
	return multiply(this, rotateAxisAngle(x, y, z, angle));
};


/**
 * Returns a string representation of the matrix.
 * @return {string}
 */
CSSMatrix.prototype.toString = function() {
	var affine, m = this,
		fix = function (val) {
			return val.toFixed(6);
		};

	if (isAffine(m)) affine = true;

	if (affine) {
		return  'matrix(' + [
			m.a, m.b,
			m.c, m.d,
			m.e, m.f
		].map(fix).join(', ') + ')';
	}
	// note: the elements here are transposed
	return  'matrix3d(' + [
		m.m11, m.m12, m.m13, m.m14,
		m.m21, m.m22, m.m23, m.m24,
		m.m31, m.m32, m.m33, m.m34,
		m.m41, m.m42, m.m43, m.m44
	].map(fix).join(', ') + ')';
};


// Defined in WebKitCSSMatrix, but not in the w3c draft

/**
 * Specifies a skew transformation along the x-axis by the given angle.
 *
 * @param {number} angle The angle amount in degrees to skew.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.skewX = function(angle) {
	return multiply(skewX(angle), this);
};

/**
 * Specifies a skew transformation along the x-axis by the given angle.
 *
 * @param {number} angle The angle amount in degrees to skew.
 * @return {CSSMatrix} The result matrix
 */
CSSMatrix.prototype.skewY = function(angle) {
	return multiply(skewY(angle), this);
};

if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
		exports = module.exports = CSSMatrix;
	}
	exports.CSSMatrix = CSSMatrix;
} else {
	window.CSSMatrix = CSSMatrix;
}

})();
