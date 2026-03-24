import * as kv from "./kv_store.tsx";

/**
 * Seed moderation data: Reports, Bans, and Logs
 */
export async function seedModerationData() {
  console.log("🛡️ Seeding moderation data...");

  // ============================================================================
  // REPORTS
  // ============================================================================

  const reports = [
    {
      id: "report-001",
      reporterId: "user-002",
      reporterUsername: "KornFan89",
      targetType: "user",
      targetId: "user-spam-001",
      reason: "Spam massif",
      details: "Cet utilisateur poste des liens publicitaires dans tous les commentaires",
      status: "pending",
      createdAt: "2026-03-24T08:00:00Z",
      resolvedAt: null,
      resolvedBy: null,
      resolutionNote: null
    },
    {
      id: "report-002",
      reporterId: "user-003",
      reporterUsername: "DarkFreak666",
      targetType: "comment",
      targetId: "comment-456",
      reason: "Contenu offensant",
      details: "Commentaire contenant des insultes et du harcèlement",
      status: "pending",
      createdAt: "2026-03-24T09:30:00Z",
      resolvedAt: null,
      resolvedBy: null,
      resolutionNote: null
    },
    {
      id: "report-003",
      reporterId: "user-004",
      reporterUsername: "MetalHead",
      targetType: "article",
      targetId: "article-nsfw",
      reason: "Contenu inapproprié",
      details: "Article contenant du contenu NSFW non marqué",
      status: "resolved",
      createdAt: "2026-03-23T14:20:00Z",
      resolvedAt: "2026-03-23T16:45:00Z",
      resolvedBy: "admin-001",
      resolutionNote: "Article modéré et marqué NSFW"
    },
    {
      id: "report-004",
      reporterId: "user-005",
      reporterUsername: "NuMetalKing",
      targetType: "user",
      targetId: "user-troll-123",
      reason: "Harcèlement",
      details: "Harcèlement répété de plusieurs membres",
      status: "resolved",
      createdAt: "2026-03-22T11:45:00Z",
      resolvedAt: "2026-03-22T13:20:00Z",
      resolvedBy: "admin-001",
      resolutionNote: "Utilisateur banni temporairement (30 jours)"
    },
    {
      id: "report-005",
      reporterId: "user-001",
      reporterUsername: "AdminKorn",
      targetType: "comment",
      targetId: "comment-spam-789",
      reason: "Publicité",
      details: "Lien vers site de vente illégal",
      status: "dismissed",
      createdAt: "2026-03-21T16:30:00Z",
      resolvedAt: "2026-03-21T17:00:00Z",
      resolvedBy: "admin-002",
      resolutionNote: "Fausse alerte - lien légitime"
    },
    {
      id: "report-006",
      reporterId: "user-006",
      reporterUsername: "RockGirl",
      targetType: "contribution",
      targetId: "contribution-fake",
      reason: "Contrefaçon",
      details: "Photo volée d'un autre utilisateur",
      status: "pending",
      createdAt: "2026-03-24T10:15:00Z",
      resolvedAt: null,
      resolvedBy: null,
      resolutionNote: null
    }
  ];

  for (const report of reports) {
    await kv.set(`report:${report.id}`, report);
  }

  console.log(`✅ ${reports.length} reports seeded`);

  // ============================================================================
  // BANS
  // ============================================================================

  const bans = [
    {
      id: "ban-001",
      userId: "user-spam-666",
      username: "SpamBot666",
      email: "spam@evil.com",
      reason: "Spam massif et publicité répétée",
      type: "permanent",
      duration: null,
      bannedBy: "admin-001",
      bannedByUsername: "AdminKorn",
      createdAt: "2026-03-20T10:00:00Z",
      expiresAt: null,
      status: "active",
      revokedAt: null,
      revokedBy: null
    },
    {
      id: "ban-002",
      userId: "user-troll-123",
      username: "TrollMaster",
      email: "troll@bad.com",
      reason: "Harcèlement répété de plusieurs membres",
      type: "temporary",
      duration: 30,
      bannedBy: "admin-001",
      bannedByUsername: "AdminKorn",
      createdAt: "2026-03-22T13:20:00Z",
      expiresAt: "2026-04-21T13:20:00Z",
      status: "active",
      revokedAt: null,
      revokedBy: null
    },
    {
      id: "ban-003",
      userId: "user-hater-456",
      username: "Hater123",
      email: "hate@mean.com",
      reason: "Contenu offensant répété",
      type: "temporary",
      duration: 7,
      bannedBy: "admin-002",
      bannedByUsername: "KornFan89",
      createdAt: "2026-03-15T14:00:00Z",
      expiresAt: "2026-03-22T14:00:00Z",
      status: "expired",
      revokedAt: null,
      revokedBy: null
    },
    {
      id: "ban-004",
      userId: "user-fake-789",
      username: "FakeAccount",
      email: "fake@scam.com",
      reason: "Usurpation d'identité",
      type: "permanent",
      duration: null,
      bannedBy: "admin-001",
      bannedByUsername: "AdminKorn",
      createdAt: "2026-03-18T09:30:00Z",
      expiresAt: null,
      status: "active",
      revokedAt: null,
      revokedBy: null
    },
    {
      id: "ban-005",
      userId: "user-toxic-999",
      username: "ToxicUser",
      email: "toxic@bad.com",
      reason: "Comportement toxique",
      type: "temporary",
      duration: 14,
      bannedBy: "admin-001",
      bannedByUsername: "AdminKorn",
      createdAt: "2026-03-19T11:00:00Z",
      expiresAt: "2026-04-02T11:00:00Z",
      status: "revoked",
      revokedAt: "2026-03-21T15:30:00Z",
      revokedBy: "admin-001"
    }
  ];

  for (const ban of bans) {
    await kv.set(`ban:${ban.id}`, ban);
  }

  console.log(`✅ ${bans.length} bans seeded`);

  // ============================================================================
  // LOGS
  // ============================================================================

  const logs = [
    {
      id: "log-001",
      timestamp: "2026-03-24T12:23:45Z",
      level: "success",
      action: "USER_UPDATE",
      details: "Utilisateur DarkFreak666 modifié",
      userId: "admin-001",
      username: "AdminKorn"
    },
    {
      id: "log-002",
      timestamp: "2026-03-24T12:20:12Z",
      level: "info",
      action: "ARTICLE_CREATE",
      details: "Nouvel article créé: Review Issues",
      userId: "user-002",
      username: "KornFan89"
    },
    {
      id: "log-003",
      timestamp: "2026-03-24T12:15:34Z",
      level: "warning",
      action: "STORAGE_WARNING",
      details: "Espace disque à 75%",
      userId: null,
      username: "System"
    },
    {
      id: "log-004",
      timestamp: "2026-03-24T12:10:08Z",
      level: "error",
      action: "DB_ERROR",
      details: "Connexion DB timeout (3s)",
      userId: null,
      username: "System"
    },
    {
      id: "log-005",
      timestamp: "2026-03-24T12:05:22Z",
      level: "success",
      action: "BAN_CREATE",
      details: "Utilisateur SpamBot666 banni",
      userId: "admin-001",
      username: "AdminKorn"
    },
    {
      id: "log-006",
      timestamp: "2026-03-24T12:00:45Z",
      level: "info",
      action: "COMMENT_CREATE",
      details: "Nouveau commentaire sur article #456",
      userId: "user-004",
      username: "MetalHead"
    },
    {
      id: "log-007",
      timestamp: "2026-03-24T11:58:12Z",
      level: "warning",
      action: "FAILED_LOGIN",
      details: "Tentative de connexion échouée pour admin@test.com",
      userId: null,
      username: "System"
    },
    {
      id: "log-008",
      timestamp: "2026-03-24T11:55:33Z",
      level: "success",
      action: "MEDIA_UPLOAD",
      details: "Upload: concert-photo.jpg (2.4 MB)",
      userId: "user-005",
      username: "NuMetalKing"
    },
    {
      id: "log-009",
      timestamp: "2026-03-24T11:50:21Z",
      level: "error",
      action: "IMAGE_PROCESSING_ERROR",
      details: "Échec de traitement image: corrupted-file.png",
      userId: null,
      username: "System"
    },
    {
      id: "log-010",
      timestamp: "2026-03-24T11:45:18Z",
      level: "info",
      action: "USER_LOGIN",
      details: "Connexion réussie",
      userId: "user-003",
      username: "DarkFreak666"
    },
    {
      id: "log-011",
      timestamp: "2026-03-24T11:40:09Z",
      level: "success",
      action: "COMMENT_APPROVE",
      details: "Commentaire approuvé: #789",
      userId: "admin-001",
      username: "AdminKorn"
    },
    {
      id: "log-012",
      timestamp: "2026-03-24T11:35:42Z",
      level: "warning",
      action: "RATE_LIMIT",
      details: "Rate limit atteint pour IP: 192.168.1.100",
      userId: null,
      username: "System"
    },
    {
      id: "log-013",
      timestamp: "2026-03-24T11:30:15Z",
      level: "info",
      action: "REPORT_CREATE",
      details: "Nouveau signalement créé: spam",
      userId: "user-002",
      username: "KornFan89"
    },
    {
      id: "log-014",
      timestamp: "2026-03-24T11:25:58Z",
      level: "success",
      action: "BACKUP_COMPLETE",
      details: "Backup automatique terminé (4.2 GB)",
      userId: null,
      username: "System"
    },
    {
      id: "log-015",
      timestamp: "2026-03-24T11:20:33Z",
      level: "error",
      action: "EMAIL_SEND_FAILURE",
      details: "Échec d'envoi email à: user@example.com",
      userId: null,
      username: "System"
    }
  ];

  for (const log of logs) {
    await kv.set(`log:${log.id}`, log);
  }

  console.log(`✅ ${logs.length} logs seeded`);

  console.log("✅ Moderation data seeding complete!");
}
