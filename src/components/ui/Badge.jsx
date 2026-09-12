import { getEstadoColor, getEstadoLabel } from '../../utils/helpers'

export default function Badge({ estado }) {
  return (
    <span
      className="badge"
      style={{ backgroundColor: getEstadoColor(estado) + '22', color: getEstadoColor(estado), borderColor: getEstadoColor(estado) }}
    >
      {getEstadoLabel(estado)}
    </span>
  )
}
