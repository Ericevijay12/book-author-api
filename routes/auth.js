const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: OAuth login and user authentication
 */

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Login with GitHub OAuth
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to GitHub login page
 */

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback URL
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects after successful login or failure
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login with Google OAuth
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google login page
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback URL
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects after successful login or failure
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout the current user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Get the authenticated user's information
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Returns authenticated user info
 *       401:
 *         description: User not authenticated
 */

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // or send JSON: res.json(req.user);
  }
);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // or send JSON: res.json(req.user);
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Get current authenticated user info
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;
