set -e

grunt build

rsync -vrz --delete ./build/ <username>@<host>:<dir>

open <live_url>
