export default function StatsCard({ icon, label, value, color = '#E6007A' }) {
  return (
    <div className="stats-card glass">
      <div className="stats-icon" style={{ backgroundColor: color + '22', color }}>{icon}</div>
      <div className="stats-info">
        <span className="stats-value">{value}</span>
        <span className="stats-label">{label}</span>
      </div>
    </div>
  )
}
