set -e

grunt build

rsync -vrz --delete ./dist/ <username>@<host>:<dir>

open <live_url>
