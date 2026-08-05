# Security Policy

## Supported Versions

Security fixes are provided for the latest published minor release line. Before
reporting a vulnerability, upgrade to the latest FlowerKit version and confirm
that the issue is still reproducible.

| Version | Supported |
| --- | --- |
| `1.1.x` | Yes |
| `< 1.1.0` | No |

The supported release line will be updated when a new minor version is
published.

## Reporting a Vulnerability

Do not disclose a suspected vulnerability in a public issue, pull request, or
discussion. Email [me@web3r.ru](mailto:me@web3r.ru) with the subject
`FlowerKit security report`.

Include as much of the following information as possible:

- The affected FlowerKit version and package entry point
- The affected browser, Node.js version, bundler, or SSR environment
- A minimal reproduction or proof of concept
- The expected and observed behavior
- The potential impact and attack scenario
- Any known workaround or suggested mitigation
- Whether the report or its details have been shared elsewhere

Avoid including secrets or personal data in the report. Use a minimal synthetic
example whenever possible.

## What to Expect

The maintainer aims to:

- Acknowledge the report within seven days
- Confirm whether the issue is accepted, needs more information, or is outside
  the project's scope after initial investigation
- Provide status updates while an accepted report is being resolved
- Coordinate a release and public disclosure when a fix or mitigation is ready

Response and remediation time depends on severity, reproducibility, and release
complexity. Please allow reasonable time for investigation before publishing
details. Reporter credit will be included in the advisory or release notes when
requested and appropriate.

## Scope

Reports are generally in scope when they demonstrate a security impact caused
by FlowerKit's published runtime code or package contents. General support
questions, feature requests, and bugs without a security impact should use the
channels described in [SUPPORT.md](./SUPPORT.md).
