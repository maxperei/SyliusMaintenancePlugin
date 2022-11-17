<?php

declare(strict_types=1);

namespace Synolia\SyliusMaintenancePlugin\Checker;

use Symfony\Component\HttpFoundation\Request;
use Synolia\SyliusMaintenancePlugin\Model\MaintenanceConfiguration;
use Synolia\SyliusMaintenancePlugin\Storage\TokenStorage;
use Synolia\SyliusMaintenancePlugin\Voter\IsMaintenanceVoterInterface;

class TokenChecker implements IsMaintenanceCheckerInterface
{
    private TokenStorage $storage;

    public function __construct(TokenStorage $storage)
    {
        $this->storage = $storage;
    }

    public static function getDefaultPriority(): int
    {
        return 99;
    }

    public function isMaintenance(MaintenanceConfiguration $configuration, Request $request): bool
    {
        if ($this->storage->get() === $configuration->getToken()) {
            return IsMaintenanceVoterInterface::ACCESS_GRANTED;
        }

        return IsMaintenanceVoterInterface::ACCESS_DENIED;
    }
}