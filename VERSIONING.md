# Version Management Guide

This guide explains how to manage versions for the Larastart package.

## Version Format

Larastart follows [Semantic Versioning](https://semver.org/) (SemVer):

```
MAJOR.MINOR.PATCH
```

- **MAJOR**: Breaking changes that require code modifications
- **MINOR**: New features that are backwards compatible
- **PATCH**: Bug fixes and small improvements

## Updating the Version

### 1. Update composer.json

Edit the `version` field in `composer.json`:

```json
{
    "version": "1.0.0"
}
```

### 2. Create a Git Tag

After updating the version, create a Git tag:

```bash
# For a new release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# For a patch release
git tag -a v1.0.1 -m "Patch release: Bug fixes"
git push origin v1.0.1

# For a minor release
git tag -a v1.1.0 -m "Minor release: New features"
git push origin v1.1.0

# For a major release
git tag -a v2.0.0 -m "Major release: Breaking changes"
git push origin v2.0.0
```

### 3. Update CHANGELOG.md (Recommended)

Create or update a `CHANGELOG.md` file to document changes:

```markdown
# Changelog

## [1.0.0] - 2024-01-01

### Added
- Initial release
- Inertia.js + React setup
- Module-based architecture
- E-commerce features

### Changed
- ...

### Fixed
- ...
```

## Version Workflow

1. **Development**: Work on features/fixes in `main` or feature branches
2. **Version Update**: Update version in `composer.json`
3. **Commit**: Commit the version change
4. **Tag**: Create a Git tag with the version number
5. **Push**: Push commits and tags to repository
6. **Packagist**: Packagist will automatically detect the new tag

## Branch Strategy

- `main` or `master`: Stable releases
- `develop`: Development branch
- `v1.x.x`: Version-specific branches (if needed)

## Pre-release Versions

For pre-release versions, use suffixes:

- `1.0.0-alpha.1` - Alpha release
- `1.0.0-beta.1` - Beta release
- `1.0.0-rc.1` - Release candidate

Update in `composer.json`:
```json
{
    "version": "1.0.0-alpha.1"
}
```

## Checking Current Version

```bash
# From composer.json
composer show faysal0x1/larastart

# From Git tags
git tag -l

# Latest tag
git describe --tags --abbrev=0
```

## Automated Versioning (Optional)

You can use tools like:
- [semantic-release](https://github.com/semantic-release/semantic-release)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Example Release Process

```bash
# 1. Update version in composer.json
# 2. Commit changes
git add composer.json
git commit -m "Bump version to 1.0.1"

# 3. Create and push tag
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin main
git push origin v1.0.1

# 4. Packagist will automatically update
```

## Notes

- Always update the version before creating a tag
- Tag names should start with `v` (e.g., `v1.0.0`)
- Version in `composer.json` should match the tag (without `v`)
- Packagist reads tags, not the version field in composer.json, but it's good practice to keep them in sync

