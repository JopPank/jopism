param(
  [string]$SleeperUsername = 'ijopi',
  [string]$LeagueName = 'OF (only football)',
  [int]$Season = [DateTime]::UtcNow.Year
)

$ErrorActionPreference = 'Stop'
$apiBase = 'https://api.sleeper.app/v1'

function Get-SleeperData {
  param([Parameter(Mandatory = $true)][string]$Uri)

  try {
    return Invoke-RestMethod -Uri $Uri -TimeoutSec 30
  } catch {
    throw "Sleeper API request failed for $Uri`: $($_.Exception.Message)"
  }
}

$user = Get-SleeperData -Uri "$apiBase/user/$SleeperUsername"
if (-not $user.user_id) {
  throw "Sleeper did not return a user for username '$SleeperUsername'."
}

$leagues = @(
  (Get-SleeperData -Uri "$apiBase/user/$($user.user_id)/leagues/nfl/$Season") |
    ForEach-Object { $_ }
)
$matchingLeagues = @($leagues | Where-Object { $_.name -ceq $LeagueName })
if ($matchingLeagues.Count -ne 1) {
  throw "Expected one $Season Sleeper league named '$LeagueName'; found $($matchingLeagues.Count)."
}

$league = $matchingLeagues[0]
$leagueUsers = @(
  (Get-SleeperData -Uri "$apiBase/league/$($league.league_id)/users") |
    ForEach-Object { $_ }
)
$rosters = @(
  (Get-SleeperData -Uri "$apiBase/league/$($league.league_id)/rosters") |
    ForEach-Object { $_ }
)
$myRoster = $rosters | Where-Object { $_.owner_id -eq $user.user_id }
if (-not $myRoster) {
  throw "No roster in '$LeagueName' belongs to Sleeper user '$SleeperUsername'."
}

$myLeagueUser = $leagueUsers | Where-Object { $_.user_id -eq $user.user_id }
if (-not $myLeagueUser) {
  throw "Sleeper did not return the league profile for '$SleeperUsername'."
}

$week = [int]$league.settings.leg
$matchups = @(
  (Get-SleeperData -Uri "$apiBase/league/$($league.league_id)/matchups/$week") |
    ForEach-Object { $_ }
)
$myMatchup = $matchups | Where-Object { $_.roster_id -eq $myRoster.roster_id }
$matchupSummary = $null
if ($myMatchup) {
  $opponentMatchup = $matchups | Where-Object {
    $_.matchup_id -eq $myMatchup.matchup_id -and $_.roster_id -ne $myRoster.roster_id
  } | Select-Object -First 1

  if ($opponentMatchup) {
    $opponentRoster = $rosters | Where-Object { $_.roster_id -eq $opponentMatchup.roster_id }
    $opponentUser = $leagueUsers | Where-Object { $_.user_id -eq $opponentRoster.owner_id }
    $opponentName = $opponentUser.metadata.team_name
    if (-not $opponentName) {
      $opponentName = $opponentUser.display_name
    }

    $matchupSummary = [ordered]@{
      teamName       = $myLeagueUser.metadata.team_name
      points         = [double]$myMatchup.points
      opponentName   = $opponentName
      opponentPoints = [double]$opponentMatchup.points
    }
  }
}

$teamName = $myLeagueUser.metadata.team_name
if (-not $teamName) {
  $teamName = $myLeagueUser.display_name
}

$stats = [ordered]@{
  updatedAt = [DateTime]::UtcNow.ToString('o')
  sleeper   = [ordered]@{
    leagueId    = $league.league_id
    leagueName  = $league.name
    leagueUrl   = "https://sleeper.com/leagues/$($league.league_id)"
    season      = [int]$league.season
    week        = $week
    username    = $user.username
    teamName    = $teamName
    totalTeams  = [int]$league.total_rosters
    wins        = [int]$myRoster.settings.wins
    losses      = [int]$myRoster.settings.losses
    ties        = [int]$myRoster.settings.ties
    pointsFor   = [double]$myRoster.settings.fpts
    matchup     = $matchupSummary
  }
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$outputPath = Join-Path $repoRoot 'data\fantasy-stats.json'
$json = $stats | ConvertTo-Json -Depth 8
Set-Content -LiteralPath $outputPath -Value $json -Encoding utf8
Write-Host "Updated fantasy stats for $($stats.sleeper.teamName) in $($stats.sleeper.leagueName), week $week."
