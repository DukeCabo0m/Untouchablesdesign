# Documentation des Entités et Relations - Backend Symfony API
## Site Untouchables - Communauté Francophone Korn

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble](#vue-densemble)
2. [Entités principales](#entités-principales)
3. [Diagramme des relations](#diagramme-des-relations)
4. [Configuration Symfony recommandée](#configuration-symfony-recommandée)
5. [Endpoints API suggérés](#endpoints-api-suggérés)

---

## 🎯 VUE D'ENSEMBLE

### Stack technique recommandée
- **Framework**: Symfony 6.4 ou 7.x
- **ORM**: Doctrine
- **API**: API Platform (recommandé) ou FOSRestBundle
- **Authentification**: JWT (LexikJWTAuthenticationBundle)
- **CORS**: NelmioCorsBundle
- **Validation**: Symfony Validator
- **Fixtures**: DoctrineFixturesBundle (pour les données de test)

### Architecture API
- **Format**: JSON
- **Authentification**: JWT Bearer Token
- **Pagination**: Activée pour toutes les collections
- **Filtres**: Par catégorie, date, tags, etc.
- **Upload**: Images pour avatars, covers, etc.

---

## 📦 ENTITÉS PRINCIPALES

### 1. **User** (Utilisateur)
Gère les comptes utilisateurs de la communauté.

```php
<?php
// src/Entity/User.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'users')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 30)]
    private string $username;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Email]
    private string $email;

    #[ORM\Column(type: 'json')]
    private array $roles = [];

    #[ORM\Column(type: 'string')]
    private string $password;

    #[ORM\Column(type: 'string', length: 500, nullable: true)]
    private ?string $avatar = null;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Assert\Length(max: 500)]
    private ?string $bio = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $location = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Assert\Url]
    private ?string $website = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $facebookUrl = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $instagramUrl = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $tiktokUrl = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $lastLoginAt = null;

    #[ORM\Column(type: 'boolean')]
    private bool $isVerified = false;

    #[ORM\Column(type: 'integer')]
    private int $level = 1; // Niveau utilisateur (gamification)

    #[ORM\Column(type: 'integer')]
    private int $experiencePoints = 0;

    // Relations
    
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Comment::class, cascade: ['remove'])]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: FavoriteAlbum::class, cascade: ['remove'])]
    private Collection $favoriteAlbums;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: AttendedConcert::class, cascade: ['remove'])]
    private Collection $attendedConcerts;

    #[ORM\ManyToMany(targetEntity: Badge::class)]
    #[ORM\JoinTable(name: 'user_badges')]
    private Collection $badges;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: ForumPost::class, cascade: ['remove'])]
    private Collection $forumPosts;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: NewsArticle::class)]
    private Collection $newsArticles;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->favoriteAlbums = new ArrayCollection();
        $this->attendedConcerts = new ArrayCollection();
        $this->badges = new ArrayCollection();
        $this->forumPosts = new ArrayCollection();
        $this->newsArticles = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 2. **Album**
Discographie complète de Korn.

```php
<?php
// src/Entity/Album.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'albums')]
class Album
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $title;

    #[ORM\Column(type: 'integer')]
    #[Assert\Range(min: 1993, max: 2100)]
    private int $year;

    #[ORM\Column(type: 'string', length: 50)]
    #[Assert\Choice(choices: ['studio', 'live', 'compilation', 'single', 'ep'])]
    private string $type;

    #[ORM\Column(type: 'string', length: 500, nullable: true)]
    private ?string $cover = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $producer = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $label = null;

    #[ORM\Column(type: 'text')]
    private string $description;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $certifications = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $salesInfo = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    // Relations
    
    #[ORM\OneToMany(mappedBy: 'album', targetEntity: Track::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[ORM\OrderBy(['number' => 'ASC'])]
    private Collection $tracks;

    #[ORM\OneToMany(mappedBy: 'album', targetEntity: Comment::class, cascade: ['remove'])]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'album', targetEntity: FavoriteAlbum::class, cascade: ['remove'])]
    private Collection $favorites;

    public function __construct()
    {
        $this->tracks = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->favorites = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 3. **Track**
Morceaux individuels des albums.

```php
<?php
// src/Entity/Track.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'tracks')]
class Track
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'integer')]
    #[Assert\Range(min: 1, max: 100)]
    private int $number;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $title;

    #[ORM\Column(type: 'string', length: 10)]
    #[Assert\Regex(pattern: '/^\d{1,2}:\d{2}$/')]
    private string $duration; // Format: "3:45"

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $notes = null;

    #[ORM\Column(type: 'boolean')]
    private bool $isSingle = false;

    #[ORM\Column(type: 'boolean')]
    private bool $hasVideoClip = false;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $streamingLinks = null; // spotify, appleMusic, youtube

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    // Relations
    
    #[ORM\ManyToOne(targetEntity: Album::class, inversedBy: 'tracks')]
    #[ORM\JoinColumn(nullable: false)]
    private Album $album;

    #[ORM\OneToMany(mappedBy: 'track', targetEntity: Comment::class, cascade: ['remove'])]
    private Collection $comments;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 4. **Single**
Singles et EPs (peuvent être liés ou indépendants d'un album).

```php
<?php
// src/Entity/Single.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'singles')]
class Single
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $title;

    #[ORM\Column(type: 'integer')]
    #[Assert\Range(min: 1993, max: 2100)]
    private int $year;

    #[ORM\Column(type: 'string', length: 500, nullable: true)]
    private ?string $cover = null;

    #[ORM\Column(type: 'string', length: 10)]
    private string $duration;

    #[ORM\Column(type: 'text')]
    private string $description;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $videoClip = null; // director, views, description

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $chartPositions = null; // [{ country, position }]

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $certifications = null;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $bSides = null; // [{ title, duration }]

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $streamingLinks = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    // Relations
    
    #[ORM\ManyToOne(targetEntity: Album::class)]
    #[ORM\JoinColumn(nullable: true)] // Peut être null si le single n'est pas dans un album
    private ?Album $album = null;

    #[ORM\OneToMany(mappedBy: 'single', targetEntity: Comment::class, cascade: ['remove'])]
    private Collection $comments;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 5. **Member**
Membres actuels et anciens du groupe.

```php
<?php
// src/Entity/Member.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'members')]
class Member
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $name;

    #[ORM\Column(type: 'string', length: 255)]
    private string $role;

    #[ORM\Column(type: 'string', length: 255)]
    private string $period; // Ex: "1993 - Aujourd'hui"

    #[ORM\Column(type: 'string', length: 20)]
    #[Assert\Choice(choices: ['active', 'former'])]
    private string $status;

    #[ORM\Column(type: 'text')]
    private string $bio;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $birthDate = null; // Format texte: "18 janvier 1971"

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $instruments = null;

    #[ORM\Column(type: 'string', length: 500, nullable: true)]
    private ?string $image = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 6. **NewsArticle**
Actualités du site.

```php
<?php
// src/Entity/NewsArticle.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'news_articles')]
class NewsArticle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $title;

    #[ORM\Column(type: 'string', length: 50)]
    #[Assert\Choice(choices: ['album', 'tournée', 'interview', 'communauté', 'actualité'])]
    private string $category;

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $publishedAt;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank]
    #[Assert\Length(max: 500)]
    private string $excerpt;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank]
    private string $content; // Markdown ou HTML

    #[ORM\Column(type: 'string', length: 500, nullable: true)]
    private ?string $image = null;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $tags = null;

    #[ORM\Column(type: 'boolean')]
    private bool $featured = false;

    #[ORM\Column(type: 'integer')]
    private int $viewCount = 0;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    // Relations
    
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'newsArticles')]
    #[ORM\JoinColumn(nullable: false)]
    private User $author;

    #[ORM\OneToMany(mappedBy: 'newsArticle', targetEntity: Comment::class, cascade: ['remove'])]
    private Collection $comments;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 7. **Concert**
Concerts passés et à venir.

```php
<?php
// src/Entity/Concert.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'concerts')]
class Concert
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'datetime')]
    #[Assert\NotBlank]
    private \DateTimeInterface $date;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $venue; // Nom de la salle

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $city;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $country;

    #[ORM\Column(type: 'string', length: 50)]
    #[Assert\Choice(choices: ['upcoming', 'past', 'sold-out', 'cancelled'])]
    private string $status;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $festival = null;

    #[ORM\Column(type: 'string', length: 500, nullable: true)]
    #[Assert\Url]
    private ?string $ticketsUrl = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $attendance = null; // Ex: "12,000 personnes"

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $support = null; // Groupes en première partie

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $notes = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    // Relations
    
    #[ORM\OneToMany(mappedBy: 'concert', targetEntity: AttendedConcert::class, cascade: ['remove'])]
    private Collection $attendees;

    #[ORM\OneToMany(mappedBy: 'concert', targetEntity: Comment::class, cascade: ['remove'])]
    private Collection $comments;

    public function __construct()
    {
        $this->attendees = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 8. **Comment**
Commentaires sur albums, tracks, singles, concerts, news.

```php
<?php
// src/Entity/Comment.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'comments')]
class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 2000)]
    private string $content;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    #[ORM\Column(type: 'boolean')]
    private bool $isApproved = true; // Modération

    // Relations - Commentaire peut être sur différentes entités
    
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Album::class, inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'CASCADE')]
    private ?Album $album = null;

    #[ORM\ManyToOne(targetEntity: Track::class, inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'CASCADE')]
    private ?Track $track = null;

    #[ORM\ManyToOne(targetEntity: Single::class, inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'CASCADE')]
    private ?Single $single = null;

    #[ORM\ManyToOne(targetEntity: Concert::class, inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'CASCADE')]
    private ?Concert $concert = null;

    #[ORM\ManyToOne(targetEntity: NewsArticle::class, inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'CASCADE')]
    private ?NewsArticle $newsArticle = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 9. **FavoriteAlbum**
Albums favoris des utilisateurs (relation ManyToMany avec données supplémentaires).

```php
<?php
// src/Entity/FavoriteAlbum.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'favorite_albums')]
class FavoriteAlbum
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'favoriteAlbums')]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Album::class, inversedBy: 'favorites')]
    #[ORM\JoinColumn(nullable: false)]
    private Album $album;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $addedAt;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $rank = null; // Ordre dans la liste de favoris

    public function __construct()
    {
        $this->addedAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 10. **AttendedConcert**
Concerts auxquels les utilisateurs ont assisté.

```php
<?php
// src/Entity/AttendedConcert.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'attended_concerts')]
class AttendedConcert
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'attendedConcerts')]
    #[ORM\JoinColumn(nullable: false)]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Concert::class, inversedBy: 'attendees')]
    #[ORM\JoinColumn(nullable: false)]
    private Concert $concert;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $addedAt;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $note = null; // Note personnelle sur le concert

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $rating = null; // Note de 1 à 5

    public function __construct()
    {
        $this->addedAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 11. **Badge**
Badges de gamification.

```php
<?php
// src/Entity/Badge.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'badges')]
class Badge
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $name;

    #[ORM\Column(type: 'string', length: 500)]
    #[Assert\NotBlank]
    private string $description;

    #[ORM\Column(type: 'string', length: 100)]
    private string $icon; // Nom de l'icône Lucide ou emoji

    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    private ?string $color = null; // Couleur hex

    #[ORM\Column(type: 'integer')]
    private int $experiencePoints = 0; // Points gagnés en obtenant ce badge

    #[ORM\Column(type: 'string', length: 50)]
    #[Assert\Choice(choices: ['common', 'rare', 'epic', 'legendary'])]
    private string $rarity = 'common';

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 12. **ForumPost** (OPTIONNEL - pour un futur forum)
Posts de forum communautaire.

```php
<?php
// src/Entity/ForumPost.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'forum_posts')]
class ForumPost
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $slug;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private string $title;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank]
    private string $content;

    #[ORM\Column(type: 'string', length: 100)]
    #[Assert\Choice(choices: ['discussion', 'question', 'annonce', 'débat'])]
    private string $category;

    #[ORM\Column(type: 'boolean')]
    private bool $isPinned = false;

    #[ORM\Column(type: 'boolean')]
    private bool $isLocked = false;

    #[ORM\Column(type: 'integer')]
    private int $viewCount = 0;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    // Relations
    
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'forumPosts')]
    #[ORM\JoinColumn(nullable: false)]
    private User $author;

    #[ORM\OneToMany(mappedBy: 'forumPost', targetEntity: ForumReply::class, cascade: ['remove'])]
    #[ORM\OrderBy(['createdAt' => 'ASC'])]
    private Collection $replies;

    public function __construct()
    {
        $this->replies = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

### 13. **ForumReply** (OPTIONNEL)
Réponses aux posts de forum.

```php
<?php
// src/Entity/ForumReply.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'forum_replies')]
class ForumReply
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank]
    private string $content;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    // Relations
    
    #[ORM\ManyToOne(targetEntity: ForumPost::class, inversedBy: 'replies')]
    #[ORM\JoinColumn(nullable: false)]
    private ForumPost $forumPost;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private User $author;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters et Setters à générer...
}
```

---

## 🔗 DIAGRAMME DES RELATIONS

```
┌─────────────┐
│    USER     │───────┐
└─────────────┘       │
       │              │
       │ 1:N          │ M:N (via user_badges)
       │              │
       ├──────────────┼─────────────┐
       │              │             │
       ▼              ▼             ▼
┌──────────────┐  ┌────────┐  ┌──────────────────┐
│   COMMENT    │  │ BADGE  │  │ FAVORITE_ALBUM   │
└──────────────┘  └────────┘  └──────────────────┘
       │                              │
       │ N:1                         │ N:1
       │                              │
       └──────────┬──────────┬────────┼──────────┬─────────┐
                  │          │        │          │         │
                  ▼          ▼        ▼          ▼         ▼
            ┌──────────┐ ┌───────┐ ┌──────┐ ┌────────┐ ┌─────────┐
            │  ALBUM   │ │TRACK  │ │SINGLE│ │CONCERT │ │  NEWS   │
            └──────────┘ └───────┘ └──────┘ └────────┘ └─────────┘
                  │         │         │          │           │
                  │ 1:N     │         │ N:1      │           │ N:1
                  │         │         │          │           │
                  └─────────┘         └──────────┘           └──────────┐
                                                                        │
                                                                        ▼
┌──────────────────┐                                              ┌──────────┐
│ ATTENDED_CONCERT │                                              │   USER   │
└──────────────────┘                                              │ (author) │
       │                                                          └──────────┘
       │ N:1
       │
       ▼
┌──────────┐
│  USER    │
└──────────┘

MEMBRES (indépendant)
┌──────────┐
│  MEMBER  │
└──────────┘

FORUM (optionnel)
┌─────────────┐
│ FORUM_POST  │
└─────────────┘
       │ 1:N
       ▼
┌──────────────┐
│ FORUM_REPLY  │
└──────────────┘
```

---

## ⚙️ CONFIGURATION SYMFONY RECOMMANDÉE

### 1. Packages à installer

```bash
# Installation de base
composer create-project symfony/skeleton:"^6.4" untouchables-api
cd untouchables-api

# ORM & Base de données
composer require symfony/orm-pack
composer require symfony/maker-bundle --dev

# API
composer require api-platform/core

# Authentification
composer require lexik/jwt-authentication-bundle

# CORS
composer require nelmio/cors-bundle

# Validation
composer require symfony/validator

# Serialization
composer require symfony/serializer-pack

# Fixtures (données de test)
composer require orm-fixtures --dev

# Upload de fichiers
composer require vich/uploader-bundle

# UUID (recommandé pour les IDs publics)
composer require symfony/uid
```

### 2. Configuration de la base de données (.env)

```env
# DATABASE_URL="mysql://user:password@127.0.0.1:3306/untouchables_db?serverVersion=8.0"
DATABASE_URL="postgresql://user:password@127.0.0.1:5432/untouchables_db?serverVersion=15&charset=utf8"
```

### 3. Configuration CORS (config/packages/nelmio_cors.yaml)

```yaml
nelmio_cors:
    defaults:
        origin_regex: true
        allow_origin: ['%env(CORS_ALLOW_ORIGIN)%']
        allow_methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
        allow_headers: ['Content-Type', 'Authorization']
        expose_headers: ['Link']
        max_age: 3600
    paths:
        '^/api/': ~
```

### 4. Configuration JWT (config/packages/lexik_jwt_authentication.yaml)

```yaml
lexik_jwt_authentication:
    secret_key: '%env(resolve:JWT_SECRET_KEY)%'
    public_key: '%env(resolve:JWT_PUBLIC_KEY)%'
    pass_phrase: '%env(JWT_PASSPHRASE)%'
    token_ttl: 86400 # 24h
```

Générer les clés JWT :
```bash
php bin/console lexik:jwt:generate-keypair
```

### 5. Configuration API Platform (config/packages/api_platform.yaml)

```yaml
api_platform:
    title: 'Untouchables API'
    version: '1.0.0'
    description: 'API du site communautaire Untouchables - Fans de Korn'
    
    formats:
        jsonld: ['application/ld+json']
        json: ['application/json']
    
    defaults:
        pagination_enabled: true
        pagination_items_per_page: 20
        pagination_client_enabled: true
        pagination_client_items_per_page: true
        
    collection:
        pagination:
            enabled: true
            items_per_page: 20
            maximum_items_per_page: 100
```

---

## 🚀 ENDPOINTS API SUGGÉRÉS

### Authentification
```
POST   /api/auth/register         - Inscription
POST   /api/auth/login            - Connexion (retourne JWT)
POST   /api/auth/refresh          - Rafraîchir le token
POST   /api/auth/logout           - Déconnexion
POST   /api/auth/forgot-password  - Mot de passe oublié
POST   /api/auth/reset-password   - Réinitialiser mot de passe
GET    /api/auth/verify-email     - Vérification email
```

### Users
```
GET    /api/users                 - Liste des utilisateurs (admin)
GET    /api/users/{username}      - Profil utilisateur public
GET    /api/me                    - Profil utilisateur connecté
PUT    /api/me                    - Modifier son profil
PATCH  /api/me/avatar             - Upload avatar
DELETE /api/me                    - Supprimer son compte
GET    /api/me/stats              - Statistiques personnelles
GET    /api/me/badges             - Mes badges
```

### Albums
```
GET    /api/albums                - Liste des albums (filtres: type, year)
GET    /api/albums/{slug}         - Détail album
GET    /api/albums/studio         - Albums studio
GET    /api/albums/live           - Albums live
GET    /api/albums/compilations   - Compilations
GET    /api/albums/{slug}/tracks  - Tracks d'un album
POST   /api/albums                - Créer album (admin)
PUT    /api/albums/{slug}         - Modifier album (admin)
DELETE /api/albums/{slug}         - Supprimer album (admin)
```

### Tracks
```
GET    /api/tracks                - Liste des tracks
GET    /api/tracks/{slug}         - Détail track
GET    /api/tracks/singles        - Tracks singles
```

### Singles
```
GET    /api/singles               - Liste des singles
GET    /api/singles/{slug}        - Détail single
```

### Members
```
GET    /api/members               - Liste des membres
GET    /api/members/{slug}        - Détail membre
GET    /api/members/active        - Membres actifs
GET    /api/members/former        - Anciens membres
```

### News
```
GET    /api/news                  - Liste des news (pagination, filtres)
GET    /api/news/{slug}           - Détail news
GET    /api/news/featured         - News à la une
GET    /api/news/category/{cat}   - News par catégorie
POST   /api/news                  - Créer news (admin/modérateur)
PUT    /api/news/{slug}           - Modifier news (admin/modérateur)
DELETE /api/news/{slug}           - Supprimer news (admin)
PATCH  /api/news/{slug}/view      - Incrémenter vues
```

### Concerts
```
GET    /api/concerts              - Liste concerts
GET    /api/concerts/{slug}       - Détail concert
GET    /api/concerts/upcoming     - Concerts à venir
GET    /api/concerts/past         - Concerts passés
POST   /api/concerts              - Créer concert (admin)
PUT    /api/concerts/{slug}       - Modifier concert (admin)
DELETE /api/concerts/{slug}       - Supprimer concert (admin)
```

### Comments
```
GET    /api/comments              - Liste commentaires (filtres)
GET    /api/{entity}/{slug}/comments - Commentaires d'une entité
POST   /api/{entity}/{slug}/comments - Ajouter commentaire
PUT    /api/comments/{id}         - Modifier son commentaire
DELETE /api/comments/{id}         - Supprimer son commentaire
```

### Favorites
```
GET    /api/me/favorites/albums      - Mes albums favoris
POST   /api/albums/{slug}/favorite   - Ajouter aux favoris
DELETE /api/albums/{slug}/favorite   - Retirer des favoris
PUT    /api/me/favorites/albums/rank - Réordonner favoris
```

### Attended Concerts
```
GET    /api/me/concerts              - Concerts auxquels j'ai assisté
POST   /api/concerts/{slug}/attend   - Marquer comme assisté
DELETE /api/concerts/{slug}/attend   - Retirer de la liste
PUT    /api/me/concerts/{id}         - Modifier note/rating
```

### Badges
```
GET    /api/badges                   - Liste des badges
GET    /api/badges/{slug}            - Détail badge
GET    /api/me/badges                - Mes badges
```

### Contact (optionnel)
```
POST   /api/contact                  - Envoyer message contact
```

---

## 📝 COMMANDES UTILES

### Créer les entités
```bash
# Générer une entité
php bin/console make:entity User

# Créer la migration
php bin/console make:migration

# Exécuter la migration
php bin/console doctrine:migrations:migrate
```

### Fixtures
```bash
# Charger les données de test
php bin/console doctrine:fixtures:load
```

### Validation du schéma
```bash
php bin/console doctrine:schema:validate
```

---

## 🔐 SÉCURITÉ

### Rôles utilisateurs suggérés
```php
// User.php
const ROLE_USER = 'ROLE_USER';           // Utilisateur standard
const ROLE_MODERATOR = 'ROLE_MODERATOR'; // Modérateur (gestion commentaires/news)
const ROLE_ADMIN = 'ROLE_ADMIN';         // Admin complet
const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN'; // Super admin
```

### Configuration security.yaml (exemple)
```yaml
security:
    password_hashers:
        App\Entity\User:
            algorithm: auto

    providers:
        app_user_provider:
            entity:
                class: App\Entity\User
                property: email

    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false

        login:
            pattern: ^/api/auth/login
            stateless: true
            json_login:
                check_path: /api/auth/login
                success_handler: lexik_jwt_authentication.handler.authentication_success
                failure_handler: lexik_jwt_authentication.handler.authentication_failure

        api:
            pattern: ^/api
            stateless: true
            jwt: ~

    access_control:
        - { path: ^/api/auth, roles: PUBLIC_ACCESS }
        - { path: ^/api/docs, roles: PUBLIC_ACCESS }
        - { path: ^/api/(albums|tracks|singles|members|news|concerts), methods: [GET], roles: PUBLIC_ACCESS }
        - { path: ^/api, roles: IS_AUTHENTICATED_FULLY }
```

---

## 📦 EXEMPLE DE FIXTURE (AlbumFixtures.php)

```php
<?php
// src/DataFixtures/AlbumFixtures.php

namespace App\DataFixtures;

use App\Entity\Album;
use App\Entity\Track;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AlbumFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $album = new Album();
        $album->setSlug('korn-1994');
        $album->setTitle('Korn');
        $album->setYear(1994);
        $album->setType('studio');
        $album->setProducer('Ross Robinson');
        $album->setLabel('Immortal / Epic');
        $album->setDescription("L'album qui a tout déclenché...");
        $album->setCover('https://example.com/korn.jpg');

        // Ajouter des tracks
        $tracks = [
            ['number' => 1, 'title' => 'Blind', 'duration' => '4:19'],
            ['number' => 2, 'title' => 'Ball Tongue', 'duration' => '4:29'],
            ['number' => 3, 'title' => 'Need To', 'duration' => '4:01'],
            // ... etc
        ];

        foreach ($tracks as $trackData) {
            $track = new Track();
            $track->setSlug($album->getSlug() . '-' . strtolower(str_replace(' ', '-', $trackData['title'])));
            $track->setNumber($trackData['number']);
            $track->setTitle($trackData['title']);
            $track->setDuration($trackData['duration']);
            $track->setAlbum($album);
            
            $manager->persist($track);
        }

        $manager->persist($album);
        $manager->flush();
    }
}
```

---

## 🎨 NOTES IMPORTANTES

### Slugs
- Tous les slugs doivent être **uniques** et **URL-friendly**
- Générés automatiquement à partir du titre (utilisez `symfony/string` ou créez un service)
- Format : `lowercase-with-dashes-and-year` (ex: `korn-1994`, `blind-1994`)

### Images
- Utiliser **VichUploaderBundle** pour gérer les uploads
- Stocker les URLs absolues dans la DB
- Servir via CDN ou dossier `public/uploads/`
- Formats acceptés : JPG, PNG, WEBP
- Taille max recommandée : 5MB

### Pagination
- Par défaut : 20 items par page
- Max : 100 items par page
- Utiliser API Platform pour la pagination automatique

### Filtres API Platform
```php
#[ApiFilter(SearchFilter::class, properties: ['type' => 'exact', 'year' => 'exact'])]
#[ApiFilter(OrderFilter::class, properties: ['year', 'title', 'createdAt'])]
```

### Validation
- Utiliser les contraintes Symfony Validator sur toutes les entités
- Groupes de validation : `create`, `update`, `public`

### Soft Delete (optionnel)
- Ajouter `deletedAt` nullable pour soft delete
- Utiliser un trait `SoftDeletable`

---

## ✅ CHECKLIST AVANT PRODUCTION

- [ ] Tous les slugs sont uniques et indexés
- [ ] Toutes les relations sont correctement définies (cascade, orphanRemoval)
- [ ] Les contraintes de validation sont en place
- [ ] Les fixtures sont créées pour le développement
- [ ] JWT est configuré et les clés sont générées
- [ ] CORS est configuré correctement
- [ ] Les rôles et permissions sont définis
- [ ] La pagination est activée sur toutes les collections
- [ ] Les filtres API Platform sont configurés
- [ ] Upload d'images fonctionne (VichUploader)
- [ ] Tests unitaires et fonctionnels sont écrits
- [ ] Documentation API est générée (API Platform auto)
- [ ] Logs et monitoring sont configurés
- [ ] Variables d'environnement sont documentées

---

## 📚 RESSOURCES

- [Symfony Documentation](https://symfony.com/doc/current/index.html)
- [API Platform](https://api-platform.com/docs)
- [Doctrine ORM](https://www.doctrine-project.org/projects/orm.html)
- [JWT Authentication](https://github.com/lexik/LexikJWTAuthenticationBundle)

---

**Bon développement ! 🤘 Are you ready?!**
