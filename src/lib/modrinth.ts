// Modrinth API wrapper

// Core
type Loader = "forge" | "fabric" | "quilt" | "neoforge";

const API_BASE_URL = "https://api.modrinth.com/v2";
export async function api<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(API_BASE_URL + endpoint, options);
    if (!res.ok) throw new Error("Modrinth request returned non-ok response");

    return await res.json();
};

// Projects
type ProjectStatus = "approved" | "archived" | "rejected" | "draft" | "unlisted" | "processing" | "withheld" | "scheduled" | "private" | "unknown";
type ProjectRequestableStatus = "approved" | "archived" | "unlisted" | "private" | "draft";
type ProjectSupportScope = "required" | "optional" | "unsupported";
type ProjectType = "mod" | "modpack" | "resourcepack" | "shader";
type ProjectMonetizationStatus = "monetized" | "demonetized" | "force-demonetized";

interface ProjectDonationUrl {
    // TODO: Real types for platform and id
    id: string;
    platform: string;
    url: string;
}

interface ProjectLicense {
    id: string;
    name: string;
    url?: string;
};

interface ProjectGalleryEntry {
    url: string;
    featured: boolean;
    title?: string;
    description?: string;
    created: string;
    ordering?: number;
}

interface Project {
    slug: string;
    title: string;
    description: string;
    categories: string[];
    client_side: ProjectSupportScope;
    server_side: ProjectSupportScope;
    body: string;
    status: ProjectStatus;
    requested_status?: ProjectRequestableStatus;
    additional_categories?: string[];
    issues_url?: string;
    source_url?: string;
    wiki_url?: string;
    discord_url?: string;
    donation_urls?: ProjectDonationUrl[];
    project_type: ProjectType;
    downloads: number;
    icon_url?: string;
    color?: number;
    thread_id?: string;
    monetization_status: ProjectMonetizationStatus;
    id: string;
    team: string;
    /** @deprecated */
    body_url?: string;
    /** @deprecated */
    moderator_message?: string;
    published: string;
    updated: string;
    approved?: string;
    queued?: string;
    followers: number;
    license?: ProjectLicense;
    versions?: string[];
    game_versions?: string[];
    loaders?: Loader[];
    gallery: ProjectGalleryEntry[];
}

export const project = async (slug: string) => await api<Project>(`/project/${slug}`);
