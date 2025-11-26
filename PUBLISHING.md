# Publishing Guide for Larastart

This guide will help you publish Larastart as a Composer package on Packagist.

## Prerequisites

1. A GitHub account
2. A Packagist account (sign up at https://packagist.org)
3. Git repository for your package

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Create GitHub Repository

1. Go to GitHub and create a new repository named `larastart`
2. Add the remote:

```bash
git remote add origin https://github.com/faysal0x1/larastart.git
git branch -M main
git push -u origin main
```

### 1.3 Update Repository URLs in composer.json

Make sure the repository URLs in `composer.json` match your actual GitHub repository:

```json
{
    "homepage": "https://github.com/faysal0x1/larastart",
    "support": {
        "issues": "https://github.com/faysal0x1/larastart/issues",
        "source": "https://github.com/faysal0x1/larastart"
    },
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/faysal0x1/larastart"
        }
    ]
}
```

## Step 2: Create Your First Release

### 2.1 Update Version

Edit `composer.json` and set the version:

```json
{
    "version": "1.0.0"
}
```

### 2.2 Commit and Tag

```bash
git add composer.json
git commit -m "Prepare v1.0.0 release"
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main
git push origin v1.0.0
```

## Step 3: Submit to Packagist

### 3.1 Submit Package

1. Go to https://packagist.org/packages/submit
2. Enter your repository URL: `https://github.com/faysal0x1/larastart`
3. Click "Check" and then "Submit"

### 3.2 Set Up Auto-Update (Recommended)

1. Go to your Packagist account settings
2. Generate a GitHub token with `repo` scope
3. Add the token to Packagist
4. Enable auto-update for your package

This will automatically update Packagist when you push new tags.

## Step 4: Verify Installation

Test that your package can be installed:

```bash
composer create-project faysal0x1/larastart test-install
cd test-install
```

## Step 5: Future Releases

For each new release:

1. **Update version** in `composer.json`
2. **Update CHANGELOG.md** with changes
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Bump version to X.Y.Z"
   ```
4. **Create and push tag**:
   ```bash
   git tag -a vX.Y.Z -m "Release version X.Y.Z"
   git push origin main
   git push origin vX.Y.Z
   ```
5. **Packagist will auto-update** (if auto-update is enabled)

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **1.0.0** → **1.0.1**: Patch (bug fixes)
- **1.0.0** → **1.1.0**: Minor (new features, backwards compatible)
- **1.0.0** → **2.0.0**: Major (breaking changes)

## Package Distribution

The `.gitattributes` file ensures that only necessary files are included in the package distribution. Files like:
- `node_modules/`
- `vendor/`
- `.env.example`
- `tests/`
- Development files

...are excluded from the distributed package.

## Testing Your Package

Before publishing, test locally:

```bash
# Create a test project
composer create-project faysal0x1/larastart test-project --prefer-source

# Or test from a local path
composer create-project ./larastart test-project --prefer-source
```

## Troubleshooting

### Package Not Found

- Ensure the repository is public (or you have proper access)
- Check that the repository URL in `composer.json` is correct
- Verify the tag exists and is pushed to GitHub

### Auto-Update Not Working

- Check GitHub token permissions
- Verify webhook is set up correctly
- Check Packagist logs for errors

### Installation Issues

- Ensure all required files are committed
- Check that `.gitattributes` isn't excluding necessary files
- Verify `composer.json` is valid: `composer validate`

## Best Practices

1. **Always tag releases** - Don't rely on branches
2. **Update CHANGELOG.md** - Document all changes
3. **Test before releasing** - Test installation in a fresh environment
4. **Follow SemVer** - Use semantic versioning consistently
5. **Keep README updated** - Ensure installation instructions are current
6. **Document breaking changes** - Clearly mark in CHANGELOG

## Additional Resources

- [Packagist Documentation](https://packagist.org/about)
- [Composer Documentation](https://getcomposer.org/doc/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

