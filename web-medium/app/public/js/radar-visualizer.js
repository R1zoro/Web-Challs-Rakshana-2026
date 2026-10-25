/**
 * Module ID: 5910 (Gaussian Plume Dispersion & Polar Radar Math)
 */
!function(){"use strict";window.NRF_Dispersion={calculateGaussianPlume:function(r,e,t,n,a,u,o){var i=r/(2*Math.PI*e*u*o),c=Math.exp(-.5*Math.pow(t/u,2)),s=Math.exp(-.5*Math.pow((n-a)/o,2))+Math.exp(-.5*Math.pow((n+a)/o,2));return i*c*s},getSectorVector:function(r){var e={A:"Sector 22 Buffer (0-2 km)",B:"Outer Ring Road (2-5 km)",C:"Prashant Vihar (5-10 km)"};return e[r]||"Unassigned"}}}();
